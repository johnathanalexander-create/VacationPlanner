import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetItemModalComponentComponent } from './budget-item-modal-component.component';

describe('BudgetItemModalComponentComponent', () => {
  let component: BudgetItemModalComponentComponent;
  let fixture: ComponentFixture<BudgetItemModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetItemModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetItemModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
