import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/provider/api.service';
import { Endpoint } from 'src/provider/endPoint.const';
import { BookingModel } from '../detail-booking/model/booking-form.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginComponent implements OnInit {
  err: string;
  logInForm: FormGroup;
  userModel;
  constructor(
    private route: Router,
    private api: ApiService,
    private bookingModel: BookingModel,
  ) { }

  ngOnInit() {
    const fb = new FormBuilder();
    this.logInForm = fb.group({
      userName: new FormControl(),
      pwd: new FormControl(),
    });
    this.bookingModel.createForm();
    this.userModel = this.bookingModel.getBookingModel().controls['user'];
  }

  logIn() {
    const account = {
      Username: this.logInForm.controls.userName.value,
      Password: this.logInForm.controls.pwd.value,
    }
    this.api.post(Endpoint.userPost, account).subscribe(res => {
      if (res && res['Token']) {
        this.userModel.controls.userName.setValue(account.Username);
        this.userModel.controls.name.setValue(res['FirstName'] + res['LastName']);
        this.userModel.controls.role.setValue(res['Role']);
        this.route.navigate(['dashboard', this.userModel.value]);
      } else {
        this.err = 'Please Re-Enter your Account';
      }
    })

  }
}
