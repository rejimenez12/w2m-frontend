import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './+material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [DateFormatPipe],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    DateFormatPipe
  ],
  providers: [
    DateFormatPipe
  ]
})
export class SharedModule { }
