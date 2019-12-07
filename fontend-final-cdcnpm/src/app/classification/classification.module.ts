import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassificationComponent } from './classification.component';
import { ClassificationRoutingModule } from './classification-routing.module';
import { MatTableModule, MatFormFieldModule, MatPaginatorModule, MatToolbarModule, MatDatepickerModule, MatInputModule, MatProgressSpinnerModule, MatRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClassificationComponent,
  ],
  imports: [
    CommonModule,
    ClassificationRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    FormsModule,
  ],
})
export class ClassificationModule { }
