import { Component, OnInit, ViewChild } from '@angular/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { MatTableDataSource, MatPaginator, MatSort, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ApiService } from 'src/provider/api.service';
import { Endpoint } from 'src/provider/endPoint.const';
import { Router } from '@angular/router';
export let FormatDate = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DDD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DDD MMMM YYYY',
  },
};
@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: FormatDate},
  ],
})
export class ClassificationComponent implements OnInit {
  displayedColumns: string[] = ['bookingID', 'invoiceID', 'date', 'time', 'total'];
  dataSource: MatTableDataSource<InvoiceModel>;
  invoices: InvoiceModel[] = [];
  showSpinner: boolean;
  total: number = 0;
  typeOfClassification: string = 'y';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: ApiService,
    private navigate: Router
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.api.get(Endpoint.invoice).subscribe((res) => {
      (res as unknown as any[]).forEach((invoice) => {
        const data: InvoiceModel = {
          BookingID: invoice.BookingID,
          InvoiceID: invoice.InvoiceID,
          Date: (new Date(invoice.Invoice_Date).getDay() + 1) + '/' + (new Date(invoice.Invoice_Date).getMonth() + 1) + '/' + new Date(invoice.Invoice_Date).getFullYear() + '',
          Time: new Date(invoice.Invoice_Date).getHours() + ':' + new Date(invoice.Invoice_Date).getHours(),
          Total: invoice.Invoice_Total,
        }
        this.total = this.total + data.Total;
        this.invoices.push(data);
      })
      this.dataSource = new MatTableDataSource(this.invoices);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showSpinner = false;
    })

   
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getDate(event) {
    const dateObj = event;
    this.invoices = [];
    this.total = 0;
    const date = {
      Year: 0,
      Month: 0,
      Day: 0,
    }
    date.Year = dateObj.value._i.year;
    date.Month  = dateObj.value._i.month + 1;
    date.Day  = dateObj.value._i.date;
    if (this.typeOfClassification === 'y') {
      this.showSpinner = true;
      this.api.get(Endpoint.invoiceByYear + date.Year).subscribe((res) => {
        (res as unknown as any[]).forEach((invoice) => {
          const data: InvoiceModel = {
            BookingID: invoice.BookingID,
            InvoiceID: invoice.InvoiceID,
            Date: (new Date(invoice.Invoice_Date).getDay() + 1) + '/' + (new Date(invoice.Invoice_Date).getMonth() + 1) + '/' + new Date(invoice.Invoice_Date).getFullYear() + '',
            Time: new Date(invoice.Invoice_Date).getHours() + ':' + new Date(invoice.Invoice_Date).getHours(),
            Total: invoice.Invoice_Total,
          }
          this.total = this.total + data.Total;
          this.invoices.push(data);
        })
        this.dataSource = new MatTableDataSource(this.invoices);
        this.showSpinner = false;
      })
    } else if(this.typeOfClassification === 'm') {
      this.showSpinner = true;
      this.api.get(Endpoint.invoiceByMonth + date.Month + '?year=' + date.Year).subscribe((res) => {
        (res as unknown as any[]).forEach((invoice) => {
          const data: InvoiceModel = {
            BookingID: invoice.BookingID,
            InvoiceID: invoice.InvoiceID,
            Date: (new Date(invoice.Invoice_Date).getDay() + 1) + '/' + (new Date(invoice.Invoice_Date).getMonth() + 1) + '/' + new Date(invoice.Invoice_Date).getFullYear() + '',
            Time: new Date(invoice.Invoice_Date).getHours() + ':' + new Date(invoice.Invoice_Date).getHours(),
            Total: invoice.Invoice_Total,
          }
          this.total = this.total + data.Total;
          this.invoices.push(data);
        })
        this.dataSource = new MatTableDataSource(this.invoices);
        this.showSpinner = false;
      })
    } else {
      this.showSpinner = true;
      this.api.get(Endpoint.invoiceByDay + date.Year + '-' + date.Month + '-' + date.Day).subscribe((res) => {
        (res as unknown as any[]).forEach((invoice) => {
          const data: InvoiceModel = {
            BookingID: invoice.BookingID,
            InvoiceID: invoice.InvoiceID,
            Date: (new Date(invoice.Invoice_Date).getDay() + 1) + '/' + (new Date(invoice.Invoice_Date).getMonth() + 1) + '/' + new Date(invoice.Invoice_Date).getFullYear() + '',
            Time: new Date(invoice.Invoice_Date).getHours() + ':' + new Date(invoice.Invoice_Date).getHours(),
            Total: invoice.Invoice_Total,
          }
          this.total = this.total + data.Total;
          this.invoices.push(data);
        })
        this.dataSource = new MatTableDataSource(this.invoices);
        this.showSpinner = false;
      });
    }

  
  }


  public goToDashboard() {
    this.navigate.navigate(['/dashboard']);  
  }
}

