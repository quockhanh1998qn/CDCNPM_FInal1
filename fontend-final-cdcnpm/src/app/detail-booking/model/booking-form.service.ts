import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable()
export class BookingModel {
    private bookingModel: FormGroup;
    fb: FormBuilder;
    constructor() { 
        this.fb = new FormBuilder();
    }

    createForm() {
        this.bookingModel = this.fb.group({
            user: this.fb.group({
                userName: this.fb.control(''),
                name: this.fb.control(''),
                role: this.fb.control(''),
            }),
            room: this.fb.group({
                roomID: this.fb.control(0),
                name: this.fb.control(''),
                type: this.fb.control(''),
                price: this.fb.control(0),
                status: this.fb.control(''),
                floor: this.fb.control(0),
            }),
            customer: this.fb.group({
                name: this.fb.control(''),
                phone: this.fb.control(''),
            }),
            bookingInfo: this.fb.group({
                id: this.fb.control(''),
                startTime: this.fb.control(''),
                endTime: this.fb.control(''),
                preMoney: this.fb.control(0),
                status: this.fb.control(''),
                date: this.fb.control(''),
                total: this.fb.control(0),
            }),
            services: this.fb.array([]),
            invoice: this.fb.group({
                total: this.fb.control(0),
            }),
        })
    }

    getBookingModel() {
        return this.bookingModel;
    }

}