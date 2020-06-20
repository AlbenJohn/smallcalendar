import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallcalendarComponent } from './smallcalendar.component';

describe('SmallcalendarComponent', () => {
  let component: SmallcalendarComponent;
  let fixture: ComponentFixture<SmallcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
