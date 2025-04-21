import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsButtonComponent } from './steps-button.component';

describe('StepsButtonComponent', () => {
  let component: StepsButtonComponent;
  let fixture: ComponentFixture<StepsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
