import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripConfigComponent } from './trip-config.component';

describe('TripConfigComponent', () => {
  let component: TripConfigComponent;
  let fixture: ComponentFixture<TripConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
