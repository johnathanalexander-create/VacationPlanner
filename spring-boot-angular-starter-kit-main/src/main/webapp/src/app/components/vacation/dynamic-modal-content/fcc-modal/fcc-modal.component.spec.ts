import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FccModalComponent } from './fcc-modal.component';

describe('FccModalComponent', () => {
  let component: FccModalComponent;
  let fixture: ComponentFixture<FccModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FccModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FccModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
