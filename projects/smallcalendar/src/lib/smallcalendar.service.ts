import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// export class SmallcalendarService {

//   constructor() {



//    }
// }

export class datePickerUtils {

  createNewDate(year = undefined, month = undefined, day = undefined, hour = undefined, minute = undefined) {
      return new Date(Date.UTC(year | 0, month | 0, day | 0, hour | 0, minute | 0));
  }

  getVisibleMinutes(date = undefined, step = undefined) {
      date = new Date(date || new Date());
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hour = date.getUTCHours();
      var minutes = [];
      var minute, pushedDate;
      for (minute = 0; minute < 60; minute += step) {
          pushedDate = this.createNewDate(year, month, day, hour, minute);
          minutes.push(pushedDate);
      }
      return minutes;
  };
  getVisibleWeeks(date = undefined) {
      date = new Date(date || new Date());
      var startMonth = date.getMonth();
      var startYear = date.getYear();
      // set date to start of the week
      date.setDate(1);

      if (date.getDay() === 0) {
          // day is sunday, let's get back to the previous week
          date.setDate(-5);
      } else {
          // day is not sunday, let's get back to the start of the week
          date.setDate(date.getDate() - (date.getDay() - 1));
      }
      if (date.getDate() === 1) {
          // day is monday, let's get back to the previous week
          date.setDate(-6);
      }

      var weeks = [];
      var week;
      while (weeks.length < 6) {
          if (date.getYear() === startYear && date.getMonth() > startMonth) {
              break;
          }
          week = this.getDaysOfWeek(date);
          weeks.push(week);
          date.setDate(date.getDate() + 7);
      }
      return weeks;
  };

  getVisibleYears(date = undefined) {
      date = new Date(date || new Date());
      date.setFullYear(date.getFullYear() - (date.getFullYear() % 12));
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var years = [];
      var pushedDate;
      for (var i = 0; i < 12; i++) {
          pushedDate = this.createNewDate(year, month, day, hour, minute);
          years.push(pushedDate);
          year++;
      }
      return years;
  };

  getDaysOfWeek(date = undefined) {
      date = new Date(date || new Date());
      date.setDate(date.getDate() - (date.getDay() - 1));
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var days = [];
      var pushedDate;
      for (var i = 0; i < 7; i++) {
          pushedDate = this.createNewDate(year, month, day);
          days.push(pushedDate);
          day++;
      }
      return days;
  };

  getVisibleMonths(date = undefined) {
      date = new Date(date || new Date());
      var year = date.getFullYear();
      var months = [];
      var pushedDate;
      for (var month = 0; month < 12; month++) {
          pushedDate = this.createNewDate(year, month, 1);
          months.push(pushedDate);
      }
      return months;
  };

  getVisibleHours(date = undefined) {
      date = new Date(date || new Date());
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hours = [];
      var hour, pushedDate;
      for (hour = 0; hour < 24; hour++) {
          pushedDate = this.createNewDate(year, month, day, hour);
          hours.push(pushedDate);
      }
      return hours;
  };

  isAfter(model, date) {
      model = (model !== undefined) ? new Date(model) : model;
      date = new Date(date);
      return model && model.getTime() >= date.getTime();
  }

  isBefore(model, date) {
      model = (model !== undefined) ? new Date(model) : model;
      date = new Date(date);
      return model.getTime() <= date.getTime();
  }
  isSameYear(model = undefined, date) {
      model = (model !== undefined) ? new Date(model) : model;
      date = new Date(date);
      return model && model.getFullYear() === date.getFullYear();
  }
  isSameMonth(model = undefined, date) {
      model = (model !== undefined) ? new Date(model) : model;
      date = new Date(date);
      return this.isSameYear(model, date) && model.getMonth() === date.getMonth();
  }

  isSameDay(model = undefined, date) {
      model = (model !== undefined) ? new Date(model) : model;
      date = new Date(date);
      return this.isSameMonth(model, date) && model.getDate() === date.getDate();
  }

  isSameHour(model = undefined, date) {
      model = (model !== undefined) ? new Date(model) : model;
      date = new Date(date);
      return this.isSameDay(model, date) && model.getHours() === date.getHours();
  };

  isSameMinutes(model = undefined, date) {
      model = (model !== undefined) ? new Date(model) : model;
      date = new Date(date);
      return this.isSameHour(model, date) && model.getMinutes() === date.getMinutes();
  }

  isValidDate(value) {
      // Invalid Date: getTime() returns NaN
      return value && !(value.getTime && value.getTime() !== value.getTime());
  }

  toMomentFormat(angularFormat) {
      function replaceAll(find, replace, string) {
          return string.replace(new RegExp(find, 'g'), replace);
      }
      var momentFormat = angularFormat;
      momentFormat = replaceAll('y', 'Y', momentFormat);
      momentFormat = replaceAll('d', 'D', momentFormat);
      momentFormat = replaceAll('E', 'd', momentFormat);
      momentFormat = replaceAll('sss', 'SSS', momentFormat);
      momentFormat = replaceAll('w', 'W', momentFormat);
      return momentFormat;
  }
};