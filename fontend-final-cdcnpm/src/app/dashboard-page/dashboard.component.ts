import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BookRoomDialogComponent } from '../component/book-room-dialog/book-room-dialog.component';
import { ApiService } from 'src/provider/api.service';
import { Endpoint } from 'src/provider/endPoint.const';
import { BookingModel } from '../detail-booking/model/booking-form.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  roomsFloor1: RoomModel[] = [];
  roomsFloor2: RoomModel[] = [];
  roomsFloor3: RoomModel[] = [];
  showSpinner = true;
  role;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.role = this.route.snapshot.paramMap.get('role');
      this.api.get(Endpoint.room).subscribe((data) => {
        (data as unknown as Array<RoomModel>).forEach((room: RoomModel) => {
          if( room.Floor === 1) {
            this.roomsFloor1.push(room);
          } else if ( room.Floor === 2) {
            this.roomsFloor2.push(room);
          } else {
            this.roomsFloor3.push(room);
          }
        })
        this.showSpinner = false;;
      });
  }

  ngOnDestroy() {

  }


  navigate(room) {
    room['nameStaff'] = this.route.snapshot.paramMap.get('name');
    room['role'] = this.role;
    room['userName'] = this.route.snapshot.paramMap.get('userName');
    this.router.navigate(['/detail', room]);
  }

  openDialog(status): void {
    if (status) {
    const dialogRef = this.dialog.open(BookRoomDialogComponent, {
      width: '500px',
      data: {},
    });
    }
  }

  goClassificationPage() {
    this.router.navigate(['/classification']);
  }

}
