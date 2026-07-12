import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingComponentComponent } from './packing-component.component';

describe('PackingComponentComponent', () => {
  let component: PackingComponentComponent;
  let fixture: ComponentFixture<PackingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackingComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
