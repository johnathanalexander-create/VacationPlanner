import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewVacationComponent } from './create-new-vacation.component';

describe('CreateNewVacationComponent', () => {
  let component: CreateNewVacationComponent;
  let fixture: ComponentFixture<CreateNewVacationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewVacationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
