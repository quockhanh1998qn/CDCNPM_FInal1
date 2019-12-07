import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { DetailBookingRoutingModule } from './detail-booking-routing.module';
import { DetailBookingComponent } from './detail-booking.component';
import { MatToolbarModule, MatCardModule, MatTabsModule, MatBadgeModule, MatChipsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatProgressSpinnerModule } from '@angular/material';
import { ItemServiceComponent } from './service-detail/component/item-service/item-service.component';
import { ShareDataService } from './services/share-data-siblings-component.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BookingModel } from './model/booking-form.service';

@NgModule({
  declarations: [
    ServiceDetailComponent,
    InvoiceComponent,
    DetailBookingComponent,
    ItemServiceComponent,
  ],
  imports: [
    CommonModule,
    DetailBookingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatBadgeModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    PdfViewerModule,
  ],
  providers: [
    ShareDataService,
    BookingModel,
  ]
})
export class DetailBookingModule { }
