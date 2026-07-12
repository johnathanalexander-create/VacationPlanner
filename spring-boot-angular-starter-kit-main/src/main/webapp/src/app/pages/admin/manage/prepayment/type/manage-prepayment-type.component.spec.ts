import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePrepaymentTypeComponent } from './manage-prepayment-type.component';

describe('ManagePrepaymentTypeComponent', () => {
  let component: ManagePrepaymentTypeComponent;
  let fixture: ComponentFixture<ManagePrepaymentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePrepaymentTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePrepaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
