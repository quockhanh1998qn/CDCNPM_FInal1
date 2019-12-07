import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './component/room/room.component';
import { DashboardComponent } from './dashboard-page/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatTableModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule, 
  MatDialogModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogRef} from '@angular/material';
import { LoginComponent } from './login-page/login-page.component';
import { HeaderDashboardComponent } from './component/header-dashboard/header-dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthenService } from './services/authen.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookRoomDialogComponent } from './component/book-room-dialog/book-room-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ApiService } from 'src/provider/api.service';
import { BookingModel } from './detail-booking/model/booking-form.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RoomComponent,
    LoginComponent,
    HeaderDashboardComponent,
    BookRoomDialogComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  providers: [
    AuthenService,
    ApiService,
    BookingModel
  ],
  entryComponents: [
    BookRoomDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
