import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailBookingComponent } from './detail-booking.component';

const routes: Routes = [
  {
    path: '',
    component: DetailBookingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailBookingRoutingModule { }
