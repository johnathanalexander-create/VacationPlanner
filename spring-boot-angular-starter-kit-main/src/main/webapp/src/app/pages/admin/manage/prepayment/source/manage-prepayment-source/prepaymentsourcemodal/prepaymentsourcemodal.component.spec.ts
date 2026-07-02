import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaymentsourcemodalComponent } from './prepaymentsourcemodal.component';

describe('PrepaymentsourcemodalComponent', () => {
  let component: PrepaymentsourcemodalComponent;
  let fixture: ComponentFixture<PrepaymentsourcemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepaymentsourcemodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepaymentsourcemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
