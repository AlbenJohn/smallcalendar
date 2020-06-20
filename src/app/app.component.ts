import { Component,ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent {
  title = 'smcalendar';
  setdate:Date = new Date("Thu Jun 04 2020 04:00:00 GMT+0400 (Gulf Standard Time)") ;
  selecteddate:any;
  onSelectdate(event){
    console.log(event)
    this.setdate=event.value.toDate()
   
    if (event.type == 'small-calendar.month-changed') {
  }
  if (event.type == 'small-calendar.day-selected') {
    this.selecteddate = event.value.toDate();
  }
  }
}
