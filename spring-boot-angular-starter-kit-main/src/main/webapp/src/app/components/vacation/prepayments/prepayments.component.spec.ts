import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaymentsComponent } from './prepayments.component';

describe('PrepaymentsComponent', () => {
  let component: PrepaymentsComponent;
  let fixture: ComponentFixture<PrepaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
