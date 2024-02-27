import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianAppointmentPrescribedUpdateFormComponent } from './physician-appointment-prescribed-update-form.component';

describe('PhysicianAppointmentPrescribedUpdateFormComponent', () => {
  let component: PhysicianAppointmentPrescribedUpdateFormComponent;
  let fixture: ComponentFixture<PhysicianAppointmentPrescribedUpdateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhysicianAppointmentPrescribedUpdateFormComponent]
    });
    fixture = TestBed.createComponent(PhysicianAppointmentPrescribedUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
