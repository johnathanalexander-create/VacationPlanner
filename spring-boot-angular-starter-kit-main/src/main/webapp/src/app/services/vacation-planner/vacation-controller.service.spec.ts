import { TestBed } from '@angular/core/testing';

import { VacationControllerService } from './vacation-controller.service';

describe('VacationControllerService', () => {
  let service: VacationControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
