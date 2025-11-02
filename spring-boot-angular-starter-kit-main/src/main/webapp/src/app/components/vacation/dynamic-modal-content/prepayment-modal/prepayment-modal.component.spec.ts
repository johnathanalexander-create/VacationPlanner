import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaymentModalComponent } from './prepayment-modal.component';

describe('PrepaymentModalComponent', () => {
  let component: PrepaymentModalComponent;
  let fixture: ComponentFixture<PrepaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepaymentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
