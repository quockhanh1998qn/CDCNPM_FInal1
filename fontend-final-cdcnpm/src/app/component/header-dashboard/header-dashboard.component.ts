import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit {
  @Output() openSideNav = new EventEmitter<boolean>();
  @Output() openPreBooking = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  handleSideNav() {
    this.openSideNav.emit(true);
  }

  preBooking() {
    this.openPreBooking.emit(true);
  }

}
