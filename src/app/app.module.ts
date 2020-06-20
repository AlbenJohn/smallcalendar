import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SmallcalendarModule} from '../../projects/smallcalendar/src/public-api'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,SmallcalendarModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
