import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/provider/api.service';
import { Endpoint } from 'src/provider/endPoint.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-room-dialog',
  templateUrl: './book-room-dialog.component.html',
  styleUrls: ['./book-room-dialog.component.scss']
})
export class BookRoomDialogComponent implements OnInit {
  roomList;
  room: RoomModel;
  constructor(
    public dialogRef: MatDialogRef<BookRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.api.get(Endpoint.room).subscribe((data) => {
      this.roomList = (data as unknown as RoomModel[]).filter((item: RoomModel) => {
        return item.Status === 'empty';
      })
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  preBooking() {
    this.room.Status = 'preBooking';
    this.api.put(Endpoint.room, this.room).subscribe((res) => {
      if (res) {
        this.onCancel();
        window.location.reload();
      }
    });
  }

  selected(event) {
    const value = event.value;
    this.room = this.roomList.filter((item) => {
      return item.RoomID === value;
    })[0];
  }

}
