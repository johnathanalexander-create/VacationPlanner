import { TestBed } from '@angular/core/testing';

import { VacationProcessorService } from './vacation-processor.service';

describe('VacationProcessorService', () => {
  let service: VacationProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
