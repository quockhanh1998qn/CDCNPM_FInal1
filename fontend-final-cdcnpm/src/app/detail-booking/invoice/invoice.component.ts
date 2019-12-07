import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, Input, ElementRef, ViewChild, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { ShareDataService } from '../services/share-data-siblings-component.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/provider/api.service';
import { Endpoint } from 'src/provider/endPoint.const';
import { BookingModel } from '../model/booking-form.service';
import { BookingProcess } from 'src/provider/process.const';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
// tslint:disable: only-arrow-functions
export class InvoiceComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() room: RoomModel;
  @ViewChild('invoice') invoiceEl: ElementRef;
  @Output() showDialogPay = new EventEmitter();
  @Output() showDialogBookingEvent = new EventEmitter();
  subscriptions: Subscription[] = [];
  isFirstTime = true;
  total = 0;
  listServices: Service[] = [];
  nowDate = new Date();
  timer = {
    time: 1,
    unit: 'Phút',
  };
  priceRoom: number;
  startTime: Date;
  idBooking: string;
  model;
  roomModel;
  bookingInfoModel;
  customerModel;
  invoiceModel;
  servicesModel;
  userModel;
  timeString: string;
  constructor(
    private shareDataService: ShareDataService,
    private api: ApiService,
    private bookingModel: BookingModel,
  ) {
  }

  ngOnInit() {
    this.priceRoom = this.room.Price;
    this.initModel();
    this.getDataFromDB();
    this.subscriptions.push(this.shareDataService.drinkData.subscribe((service: Service) => {
      if (!this.isFirstTime) {
        const data = this.setItem(service);
        const item = this.checkHaveItem(data);
        if (item) {
          this.updateItem(item, data);
        } else {
          this.addItem(data);
        }
        this.total += data.total;
        this.bookingInfoModel.patchValue({
          total: this.total,
        })
        this.invoiceModel.patchValue({
          total: this.total,
        })
      }
    })
    );
    this.subscriptions.push(this.shareDataService.foodData.subscribe((service: Service) => {
      if (!this.isFirstTime) {
        const data = this.setItem(service);
        const item = this.checkHaveItem(data);
        if (item) {
          this.updateItem(item, data);
        } else {
          this.addItem(data);
        }
        this.total += data.total;
        this.bookingInfoModel.patchValue({
          total: this.total,
        })
        this.invoiceModel.patchValue({
          total: this.total,
        })
      }
    })
    );
  }
  ngOnChanges() {
  }

  ngAfterViewInit() {
    this.isFirstTime = false;
    this.bookingInfoModel.valueChanges.subscribe((value) => {
      const bookingData: Booking = {
        BookingID: value['id'],
        CusName: this.customerModel.controls['name'].value,
        CusPhone: this.customerModel.controls['phone'].value,
        PreMoney: value['preMoney'],
        RoomID: this.roomModel.controls['roomID'].value,
        Status: value['status'],
        Total: value['total'],
        Username: 'admin',
      }
      this.api.put(Endpoint.booking, bookingData).subscribe();
    })
  }

  ngOnDestroy() {
    this.shareDataService.AddDrink({} as any);
    this.shareDataService.AddFood({} as any);
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  initModel() {
    this.model = this.bookingModel.getBookingModel();
    this.customerModel = this.model.controls.customer;
    this.roomModel = this.model.controls.room;
    this.bookingInfoModel = this.model.controls.bookingInfo;
    this.servicesModel = this.model.get('services') as FormArray;
    this.invoiceModel = this.model.controls.invoice;
    this.userModel = this.model.controls.user;
  }
  getDataFromDB() {
    if (this.room.Status === 'empty' || this.room.Status === 'preBooking') {
      this.api.get(Endpoint.booking).subscribe((bookings) => {
        const lastIndexBooking = (bookings as unknown as any[]).length + 1;
        this.idBooking = 'B0' + lastIndexBooking;
        this.startTime = new Date();
        this.timeString = new Date().getHours() + ':' + new Date().getMinutes();
        this.mapDataToModel();
        this.showDialogBooking();
      })
    } else {
      this.api.get(Endpoint.bookingByRoomId + this.room.RoomID).subscribe((data) => {
        const booking = (data as unknown as Booking[]).filter((item: Booking) => {
          return item.Status === 'B';
        })
        this.mapDataToModel(booking[0]);
        this.startTime = this.bookingInfoModel.controls['startTime'].value;
        this.calculateRoomPrice();
        this.timeString = this.startTime.getHours() + ":" + this.startTime.getMinutes();
        this.api.get(Endpoint.detailService + this.bookingInfoModel.controls.id.value).subscribe((data) => {
          (data as unknown as Service[]).forEach((serviceControl) => {
            this.api.get(Endpoint.service + serviceControl['ServiceID']).subscribe((serviceRes) => {
              const service: Service = {
                id: serviceRes['ServiceID'],
                name: serviceRes['Name'],
                quantity: serviceControl['Quantity'],
                total: serviceControl['Total'],
              }
              const itemControl = new FormBuilder().control(serviceControl);
              this.servicesModel.push(itemControl);
              this.listServices.push(service);
              this.total += service.total;
              this.bookingInfoModel.patchValue({
                total: this.total,
              })
              this.invoiceModel.patchValue({
                total: this.total,
              })
            })
          })
        })
      });

    }
  }

  mapDataToModel(data?) {
    this.invoiceModel.setValue({
      total: data ? data.Total : this.total,
    })

    this.customerModel.setValue({
      name: data ? data.CusName : '',
      phone: data ? data.CusPhone : '',
    })


    this.roomModel.setValue({
      roomID: this.room.RoomID,
      name: this.room.Name,
      type: this.room.Type,
      price: this.room.Price,
      status: this.room.Status,
      floor: this.room.Floor,
    })

    this.bookingInfoModel.patchValue({
      id: data ? data.BookingID : this.idBooking,
      startTime: data ? new Date(data.StartTime) : new Date(this.startTime),
      total: data ? data.Total : this.total,
      status: data ? data.Status : BookingProcess.booking,
      date: data ? data.Date : new Date(),
    })
  }

  checkItemsEmpty(): boolean {
    if ( this.total <= 0) {
      return false;
    } else {
      return true;
    }
  }

  checkHaveItem(data: Service): Service {
    return this.listServices.filter((item) => item.name === data.name)[0];
  }

  addItem(data: Service) {
    this.listServices.push(data);
    this.listServices[this.listServices.length - 1].quantity = data.quantity;
    const itemControl = new FormBuilder().control(data);
    this.servicesModel.push(itemControl);
    this.addServicesToDB(itemControl.value);
  }

  updateItem(item, data) {
    const items = this.listServices;
    const index = items.indexOf(item);
    items[index].quantity++;
    items[index].total += data.total;
  }

  setItem(item: Service): Service {
    return {
      id: item.id,
      name: item.name,
      total: item.total,
      quantity: item.quantity,
    };
  }

  increaseItem(item: Service) {
    const index = this.listServices.findIndex((i) => i.name === item.name);
    const unitPrice = this.listServices[index].total / this.listServices[index].quantity;
    item.quantity = item.quantity + 1;
    this.listServices[index].total += unitPrice;
    this.total += unitPrice;
    this.bookingInfoModel.patchValue({
      total: this.total,
    })
    this.invoiceModel.patchValue({
      total: this.total,
    })
    this.updateServicesToDB(this.listServices[index]);
  }

  descreaseItem(item: Service) {
    const index = this.listServices.findIndex((i) => i.name === item.name);
    const unitPrice = this.listServices[index].total / this.listServices[index].quantity;
    item.quantity = item.quantity - 1;
    if (item.quantity === 0) {
      this.deleteServicesToDB(this.listServices[index]);
      this.total -= unitPrice;
      this.listServices.splice(index, 1);
    } else {
      this.total -= unitPrice;
      this.listServices[index].total -= unitPrice;
      this.updateServicesToDB(this.listServices[index]);
    }
    this.bookingInfoModel.patchValue({
      total: this.total,
    })
    this.invoiceModel.patchValue({
      total: this.total,
    })
  }

  addServicesToDB(item) {
    if (item.quantity > 0) {
      const serviceData = {
        BookingID: this.bookingInfoModel.controls.id.value,
        ServiceID: item.id,
        Quantity: item.quantity,
        Total: item.total,
      }
      this.api.post(Endpoint.detailService, serviceData).subscribe(() => {
        console.log('ok');
      });
    }
  }

  updateServicesToDB(item) {
    if (item.quantity > 0) {
      const serviceData = {
        BookingID: this.bookingInfoModel.controls.id.value,
        ServiceID: item.id,
        Quantity: item.quantity,
        Total: item.total,
      }
      this.api.put(Endpoint.detailService, serviceData).subscribe(() => {
        console.log('ok');
      });
    }
  }

  deleteServicesToDB(item) {
    const serviceData = {
      BookingID: this.bookingInfoModel.controls.id.value,
      ServiceID: item.id,
      Quantity: 0,
      Total: 0,
      Status: 'D',
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: serviceData
    }
    this.api.delete(Endpoint.detailService, options).subscribe();
  }

  calculateRoomPrice() {
    let hour = 0;
    let minute = 0;
    const distanceDays = +String(this.nowDate.getDate()).padStart(2, '0') - +String(this.startTime.getDate()).padStart(2, '0');
    hour = (24 * distanceDays + this.nowDate.getHours() - this.startTime.getHours()) * 60;
    minute = hour + this.nowDate.getMinutes() - this.startTime.getMinutes();
    this.timer.time = minute;
    if (this.timer.time > 60) {
      this.priceRoom += (this.timer.time - 60) / 60 * this.priceRoom;
      this.total += this.priceRoom;
    } else {
      this.total = this.priceRoom;
    }
    if(!this.isFirstTime) {
      this.invoiceModel.patchValue({
        total: this.total,
      })
      this.bookingInfoModel.patchValue({
        total: this.total,
      })
    }
  }

  exportPDF(): void {
    const dataReq = {
      total: this.total,
      items: this.listServices,
      date: this.bookingInfoModel.controls.date.value,
      nameStaff: this.userModel.controls.name,
    }
    this.api.post(Endpoint.pdf, dataReq).subscribe((data) => {
      const url = 'data:application/pdf;base64,' + data;
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = 'invoice.pdf';
      a.click();
    });
  }

  showDialogPayment() {
    this.showDialogPay.emit(true);
  }

  showDialogBooking() {
    this.showDialogBookingEvent.emit(true);
  }
}


