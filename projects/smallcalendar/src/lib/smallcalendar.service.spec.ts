import { TestBed } from '@angular/core/testing';

import { SmallcalendarService } from './smallcalendar.service';

describe('SmallcalendarService', () => {
  let service: SmallcalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmallcalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
