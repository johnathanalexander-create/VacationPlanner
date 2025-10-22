import { TestBed } from '@angular/core/testing';

import { WebVacationUtilityService } from './web-vacation-utility.service';

describe('WebVacationUtilityService', () => {
  let service: WebVacationUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebVacationUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
