import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard-page/dashboard.component';
import { LoginComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'detail',
    loadChildren: './detail-booking/detail-booking.module#DetailBookingModule' ,
  },
  {
    path: 'classification',
    loadChildren: './classification/classification.module#ClassificationModule' ,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
