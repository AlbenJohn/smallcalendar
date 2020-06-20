import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { SmallcalendarComponent } from './smallcalendar.component';
import { DatePipe } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule  } from '@angular/common';

@NgModule({
  declarations: [SmallcalendarComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule
  ],
  exports: [SmallcalendarComponent],
  providers:[DatePipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class SmallcalendarModule { }
