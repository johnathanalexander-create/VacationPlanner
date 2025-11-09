import { TestBed } from '@angular/core/testing';

import { VacationUpdaterService } from './vacation-updater.service';

describe('VacationUpdaterService', () => {
  let service: VacationUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
