import { Component, NgModule, Input,OnInit, forwardRef, Output, EventEmitter, DoCheck, KeyValueDiffers, 
  ChangeDetectionStrategy, SimpleChanges,ChangeDetectorRef, OnChanges } from '@angular/core'
import {datePickerUtils} from './smallcalendar.service';
import * as moment from 'moment';
@Component({
  selector: 'smallcalendar',
  templateUrl: "./smallcalendar.html"   ,
  styleUrls: ['./smallcalendar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallcalendarComponent implements OnChanges {

  @Input() setdate: any;
  @Output()
  onSelect = new EventEmitter<any>();
  differ: any;
  arrowClick: boolean;
  after: any;
  before: any;
  model: any;
  years: any;
  months: any;
  weekdays: any;
  weeks: any;

  
  view: any = 'date';
  views:any[] = ['year', 'month', 'date'];
  step: number = 5;
  now:Date = new Date();
  cal_date: Date = new Date();
  selected: Date = new Date();
  public constructor(private differs: KeyValueDiffers, private datePickerUtils: datePickerUtils,
   private ref: ChangeDetectorRef) {
    this.differ = differs.find({}).create();
  }
  setView(nextView, evt) {
    if (this.views.indexOf(nextView) !== -1) {
      this.view = nextView;       
    }
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    this.update();
    if (this.view != 'year')
        this.onSelect.emit({ 'type': 'small-calendar.month-changed', 'value': moment(this.cal_date) });
      //$rootScope.$broadcast("small-calendar.month-changed", moment(scope.cal_date));
  }
  ngAfterViewChecked()
    {
      // this.update();
    //  this.ref.detectChanges();
    }
  update() {
    var view = this.view;
    if (this.model && !this.arrowClick) {
        this.arrowClick = false;
    }
    var date = this.cal_date;
      
    switch (view) {
    case 'year':
            this.years = this.datePickerUtils.getVisibleYears(date);
      break;
    case 'month':
            this.months = this.datePickerUtils.getVisibleMonths(date);
      break;
    case 'date':
      this.weekdays = this.weekdays || this.datePickerUtils.getDaysOfWeek();
      this.weeks = this.datePickerUtils.getVisibleWeeks(date);
      break;
    }
    this.ref.detectChanges();

  }

  ngOnInit() {

    this.years = this.datePickerUtils.getVisibleYears(new Date());
    this.months = this.datePickerUtils.getVisibleMonths(new Date());
    this.weekdays = this.datePickerUtils.getDaysOfWeek();
    this.weeks = this.datePickerUtils.getVisibleWeeks(new Date());
  }

  
  ngOnChanges(changes: SimpleChanges) {
      var chang = changes;
      if (changes["setdate"] && changes["setdate"].currentValue) {
          this.cal_date = changes["setdate"].currentValue;
      }
  }

  

  blockevents(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };
  next(delta, evt) {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    var date = this.cal_date ; 
    delta = delta || 1;
    switch (this.view) {
      case 'year':     
      case 'month':
        date.setFullYear(date.getFullYear() + delta);
        break;
      case 'date':
        date.setMonth(date.getMonth() + delta);
        break;
    }
    this.arrowClick = true;
    this.update();
    if (this.view != 'year')
        this.onSelect.emit({ 'type': "small-calendar.month-changed", 'value': moment(this.cal_date) });

  };

  setDate(date, evt) {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    this.cal_date = date;
    // change next view
    var nextView = this.views[this.views.indexOf(this.view) + 1];

    if (nextView) {
      this.setView(nextView,null);
    }
  };

  prev(delta, evt) {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    return this.next(-delta || -1,null);
  };

  isAfter(date) {
      return this.after && this.datePickerUtils.isAfter(date, this.after);
  };

  isBefore (date) {
      return this.before && this.datePickerUtils.isBefore(date, this.before);
  };

  isSameMonth(date) {
      return this.datePickerUtils.isSameMonth(new Date(), date);
  };

  isSameYear(date) {
      return this.datePickerUtils.isSameYear(new Date(), date);
  };

  isSameDay(date) {
      return this.datePickerUtils.isSameDay(new Date(), date);
  };

  isNow(date) {
    var is = true;
    var now = new Date();    
    switch (this.view) {
      case 'date':
        is = is && date.getDate() === now.getDate();    
      case 'month':
        is = is && date.getMonth() === now.getMonth();     
      case 'year':
        is = is && date.getFullYear() === now.getFullYear();
    }
    return is;
  }   

  select(day) {
    this.selected = day;
    this.onSelect.emit({ 'type': "small-calendar.day-selected", 'value': moment(day) });
  };   

 

}
