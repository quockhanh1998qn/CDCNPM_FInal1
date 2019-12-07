import { Component, OnInit, OnDestroy, ContentChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BookingModel } from './model/booking-form.service';
import { ApiService } from 'src/provider/api.service';
import { FormArray } from '@angular/forms';
import { Endpoint } from 'src/provider/endPoint.const';

@Component({
  selector: 'app-detail-booking',
  templateUrl: './detail-booking.component.html',
  styleUrls: ['./detail-booking.component.scss']
})
export class DetailBookingComponent implements OnInit {
  room: RoomModel;
  model;
  customerModel;
  roomModel;
  bookingInfoModel;
  servicesModel;
  invoiceModel;
  userModel;
  timeString;
  showSpinner;
  notification: string;
  role;
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private bookingModel: BookingModel,
    private api: ApiService,
    private naviagte: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.initModel();
    this.room = {
      RoomID: +this.route.snapshot.paramMap.get('RoomID'),
      Name: this.route.snapshot.paramMap.get('Name'),
      Status: this.route.snapshot.paramMap.get('Status'),
      Type: this.route.snapshot.paramMap.get('Type'),
      Price: +this.route.snapshot.paramMap.get('Price'),
      Floor: +this.route.snapshot.paramMap.get('Floor'),
    };
    this.userModel.controls.name = this.route.snapshot.paramMap.get('nameStaff');
    this.userModel.controls.role = this.route.snapshot.paramMap.get('role');
    this.role = this.route.snapshot.paramMap.get('role');
    this.userModel.controls.userName = this.route.snapshot.paramMap.get('userName');
    const startTime = this.bookingInfoModel.controls['startTime'].value;
    if (this.room.Status === 'empty') {
      this.timeString = new Date().getHours() + ':' + new Date().getMinutes();
    } else {
      this.timeString = new Date(startTime).getHours() + ':' + new Date(startTime).getMinutes();
    }

  }

  showDialog(value, templateRef) {
    if (value) {
      const dialogRef = this.dialog.open(templateRef, {
      });
    }
  }

  openSnackBar() {
    this.snackBar.open(this.notification, '', {
      duration: 3000,
    });
  }

  acceptPayment() {
    this.showSpinner = true;
    this.api.get(Endpoint.invoice).subscribe((invoices) => {
      const lastIndexOfInvoice = (invoices as unknown as any[]).length + 1;
      const invoiceData = {
        InvoiceID: 'IV0' + lastIndexOfInvoice,
        BookingID: this.bookingInfoModel.value.id,
        Invoice_Total: this.invoiceModel.value.total,
        User: 'phat',
      }
      const bookingData: Booking = {
        BookingID: this.bookingInfoModel.controls['id'].value,
        CusName: this.customerModel.controls['name'].value,
        CusPhone: this.customerModel.controls['phone'].value,
        PreMoney: this.bookingInfoModel.controls['preMoney'].value,
        RoomID: this.roomModel.controls['roomID'].value,
        Status: 'P',
        Total: this.bookingInfoModel.controls['total'].value,
        Username: 'admin',
      }
      this.api.post(Endpoint.invoice, invoiceData).subscribe((res) => {
        if (res) {
          this.notification = "Thanh Toán Thành Công";
          const roomData = {
            RoomID: this.roomModel.value.roomID,
            Name: this.roomModel.value.name,
            Type: this.roomModel.value.type,
            Price: this.roomModel.value.price,
            Status: "empty",
            Floor: this.roomModel.value.floor,
          }
          this.api.put(Endpoint.room, roomData).subscribe((res) => {
            if (res) {
              this.api.put(Endpoint.booking, bookingData).subscribe((res) => {
                this.showSpinner = false;
                this.naviagte.navigate(['/dashboard']);
              });
            }
          });
          
        } else {
          this.notification = "Thanh Toán Thất Bại";
        }
        this.openSnackBar();
        this.dialog.closeAll();
      });
    })
  }

  initModel() {
    this.bookingModel.createForm();
    this.model = this.bookingModel.getBookingModel();
    this.customerModel = this.model.controls.customer;
    this.roomModel = this.model.controls.room;
    this.bookingInfoModel = this.model.controls.bookingInfo;
    this.servicesModel = this.model.get('services') as FormArray;
    this.invoiceModel = this.model.controls.invoice;
    this.userModel = this.model.controls.user;
  }

  goToDashboard(templateRef) {
    if (this.room.Status === 'booking') {
      this.updateBookingToDB();
    } else {
      this.showDialog(true, templateRef);
    }

  }

  acceptBooking() {
    this.showSpinner = true;
    if (this.room.Status === 'empty') {
      this.room.Status = 'booking';
      this.api.put(Endpoint.room, this.room).subscribe((res) => {
        this.setBookingToDB();
      });
    }
    this.dialog.closeAll();
  }

  cancelBooking() {
    this.dialog.closeAll();
    this.naviagte.navigate(['/dashboard']);
  }

  cancelPreBooking() {
    this.showSpinner = true;
    this.room.Status = 'empty';
    this.api.put(Endpoint.room, this.room).subscribe((res) => {
      if (res) {
        this.cancelBooking();
        this.showSpinner = false;
      }
    })
  }

  cancelPay() {
    this.dialog.closeAll();
  }

  setBookingToDB() {
    const bookingData: Booking = {
      BookingID: this.bookingInfoModel.controls['id'].value,
      CusName: this.customerModel.controls['name'].value,
      CusPhone: this.customerModel.controls['phone'].value,
      PreMoney: this.bookingInfoModel.controls['preMoney'].value,
      RoomID: this.roomModel.controls['roomID'].value,
      Status: this.bookingInfoModel.controls['status'].value,
      Total: this.bookingInfoModel.controls['total'].value,
      Username: 'admin',
    }
    this.api.post(Endpoint.booking, bookingData).subscribe((res) => {
      if (res) {
        this.showSpinner = false;
          this.naviagte.navigate(['/dashboard', {role: this.role, name: this.userModel.controls.name}]);
      }
    })
  }

  updateBookingToDB() {
    const bookingData: Booking = {
      BookingID: this.bookingInfoModel.controls['id'].value,
      CusName: this.customerModel.controls['name'].value,
      CusPhone: this.customerModel.controls['phone'].value,
      PreMoney: this.bookingInfoModel.controls['preMoney'].value,
      RoomID: this.roomModel.controls['roomID'].value,
      Status: this.bookingInfoModel.controls['status'].value,
      Total: this.bookingInfoModel.controls['total'].value,
      Username: 'admin',
    }
    this.api.put(Endpoint.booking, bookingData).subscribe((res) => {
      if (res) {
        this.showSpinner = false;
        this.naviagte.navigate(['/dashboard',{role: this.role, name: this.userModel.controls.name}]);
      }
    })
  }
}
