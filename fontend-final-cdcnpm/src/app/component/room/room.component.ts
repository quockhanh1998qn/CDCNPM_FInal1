import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnChanges {
  @Input() room: RoomModel;
  isHover = false;
  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  changeStatusRoom(): string[] {
    if (this.room.Status === 'booking') {
      return ['booking-style'];
    } else if (this.room.Status === 'preBooking'){
      return ['prebooking-style'];
    }
    return ['default-style'];
  }

  hover(status: boolean) {
    this.isHover = status;
  }

}
