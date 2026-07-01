import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePrepaymentSourceComponent } from './manage-prepayment-source.component';

describe('ManagePrepaymentSourceComponent', () => {
  let component: ManagePrepaymentSourceComponent;
  let fixture: ComponentFixture<ManagePrepaymentSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePrepaymentSourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePrepaymentSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
