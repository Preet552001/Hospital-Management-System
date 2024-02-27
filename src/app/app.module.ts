import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhysicianListComponent } from './hospital-dashboard/physician-hospital/physician-list/physician-list.component';
import { interceptorProviders } from './interceptors/interceptors';
import { PhysicianAddFormComponent } from './hospital-dashboard/physician-hospital/physician-add-form/physician-add-form.component';
import { PhysicianUpdateFormComponent } from './hospital-dashboard/physician-hospital/physician-update-form/physician-update-form.component';
import { PhysicianDeleteComponent } from './hospital-dashboard/physician-hospital/physician-delete/physician-delete.component';
import { TreatmentListComponent } from './hospital-dashboard/treatment-hospital/treatment-list/treatment-list.component';
import { TreatmentAddFormComponent } from './hospital-dashboard/treatment-hospital/treatment-add-form/treatment-add-form.component';
import { TreatmentUpdateFormComponent } from './hospital-dashboard/treatment-hospital/treatment-update-form/treatment-update-form.component';
import { TreatmentDeleteComponent } from './hospital-dashboard/treatment-hospital/treatment-delete/treatment-delete.component';
import { HospitalDashboardComponent } from './hospital-dashboard/hospital-dashboard.component';
import { NurseListComponent } from './hospital-dashboard/nurse-hospital/nurse-list/nurse-list.component';
import { NurseAddFormComponent } from './hospital-dashboard/nurse-hospital/nurse-add-form/nurse-add-form.component';
import { NurseUpdateFormComponent } from './hospital-dashboard/nurse-hospital/nurse-update-form/nurse-update-form.component';
import { NurseDeleteComponent } from './hospital-dashboard/nurse-hospital/nurse-delete/nurse-delete.component';
import { PatientListComponent } from './hospital-dashboard/patient-hospital/patient-list/patient-list.component';
import { PatientDeleteComponent } from './hospital-dashboard/patient-hospital/patient-delete/patient-delete.component';
import { PatientAddFormComponent } from './hospital-dashboard/patient-hospital/patient-add-form/patient-add-form.component';
import { PatientUpdateFormComponent } from './hospital-dashboard/patient-hospital/patient-update-form/patient-update-form.component';
import { BlockAddFormComponent } from './hospital-dashboard/block-hospital/block-add-form/block-add-form.component';
import { BlockDeleteComponent } from './hospital-dashboard/block-hospital/block-delete/block-delete.component';
import { BlockListComponent } from './hospital-dashboard/block-hospital/block-list/block-list.component';
import { BlockUpdateFormComponent } from './hospital-dashboard/block-hospital/block-update-form/block-update-form.component';
import { RoomListComponent } from './hospital-dashboard/room-hospital/room-list/room-list.component';
import { RoomDeleteComponent } from './hospital-dashboard/room-hospital/room-delete/room-delete.component';
import { RoomAddFormComponent } from './hospital-dashboard/room-hospital/room-add-form/room-add-form.component';
import { RoomUpdateFormComponent } from './hospital-dashboard/room-hospital/room-update-form/room-update-form.component';
import { PhysicianTrainedinAddFormComponent } from './hospital-dashboard/physician-hospital/physician-list/physician-trainedin/physician-trainedin-add-form/physician-trainedin-add-form.component';
import { PhysicianTrainedinUpdateFormComponent } from './hospital-dashboard/physician-hospital/physician-list/physician-trainedin/physician-trainedin-update-form/physician-trainedin-update-form.component';
import { PhysicianTrainedinDeleteComponent } from './hospital-dashboard/physician-hospital/physician-list/physician-trainedin/physician-trainedin-delete/physician-trainedin-delete.component';
import { PhysicianTrainedinListComponent } from './hospital-dashboard/physician-hospital/physician-list/physician-trainedin/physician-trainedin-list/physician-trainedin-list.component';
import { NurseOncallAddFormComponent } from './hospital-dashboard/nurse-hospital/nurse-list/nurse-oncall/nurse-oncall-add-form/nurse-oncall-add-form.component';
import { NurseOncallDeleteComponent } from './hospital-dashboard/nurse-hospital/nurse-list/nurse-oncall/nurse-oncall-delete/nurse-oncall-delete.component';
import { NurseOncallUpdateFormComponent } from './hospital-dashboard/nurse-hospital/nurse-list/nurse-oncall/nurse-oncall-update-form/nurse-oncall-update-form.component';
import { NurseOncallCardComponent } from './hospital-dashboard/nurse-hospital/nurse-list/nurse-oncall/nurse-oncall-card/nurse-oncall-card.component';
import { NurseAppointmentListComponent } from './hospital-dashboard/nurse-hospital/nurse-list/nurse-oncall/nurse-oncall-card/nurse-appointment-list/nurse-appointment-list.component';
import { NurseAppointmentAddFormComponent } from './hospital-dashboard/nurse-hospital/nurse-list/nurse-oncall/nurse-oncall-card/nurse-appointment-add-form/nurse-appointment-add-form.component';
import { NurseAppointmentDeleteComponent } from './hospital-dashboard/nurse-hospital/nurse-list/nurse-oncall/nurse-oncall-card/nurse-appointment-delete/nurse-appointment-delete.component';
import { NurseAppointmentUpdateFromComponent } from './hospital-dashboard/nurse-hospital/nurse-list/nurse-oncall/nurse-oncall-card/nurse-appointment-update-from/nurse-appointment-update-from.component';
import { PhysicianAppointmentListComponent } from './hospital-dashboard/physician-hospital/physician-list/physician-appointment/physician-appointment-list/physician-appointment-list.component';
import { PhysicianAppointmentPrescribedCardComponent } from './hospital-dashboard/physician-hospital/physician-list/physician-appointment/physician-appointment-prescribed/physician-appointment-prescribed-card/physician-appointment-prescribed-card.component';
import { PhysicianAppointmentPrescribedAddFormComponent } from './hospital-dashboard/physician-hospital/physician-list/physician-appointment/physician-appointment-prescribed/physician-appointment-prescribed-add-form/physician-appointment-prescribed-add-form.component';
import { PhysicianAppointmentPrescribedDeleteComponent } from './hospital-dashboard/physician-hospital/physician-list/physician-appointment/physician-appointment-prescribed/physician-appointment-prescribed-delete/physician-appointment-prescribed-delete.component';
import { PhysicianAppointmentPrescribedUpdateFormComponent } from './hospital-dashboard/physician-hospital/physician-list/physician-appointment/physician-appointment-prescribed/physician-appointment-prescribed-update-form/physician-appointment-prescribed-update-form.component';
import { ToastrModule } from 'ngx-toastr';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    PhysicianListComponent,
    PhysicianAddFormComponent,
    PhysicianUpdateFormComponent,
    PhysicianDeleteComponent,
    TreatmentListComponent,
    TreatmentAddFormComponent,
    TreatmentUpdateFormComponent,
    TreatmentDeleteComponent,
    HospitalDashboardComponent,
    NurseListComponent,
    NurseAddFormComponent,
    NurseUpdateFormComponent,
    NurseDeleteComponent,
    PatientListComponent,
    PatientDeleteComponent,
    PatientAddFormComponent,
    PatientUpdateFormComponent,
    BlockAddFormComponent,
    BlockDeleteComponent,
    BlockListComponent,
    BlockUpdateFormComponent,
    RoomListComponent,
    RoomDeleteComponent,
    RoomAddFormComponent,
    RoomUpdateFormComponent,
    PhysicianTrainedinAddFormComponent,
    PhysicianTrainedinUpdateFormComponent,
    PhysicianTrainedinDeleteComponent,
    PhysicianTrainedinListComponent,
    NurseOncallAddFormComponent,
    NurseOncallDeleteComponent,
    NurseOncallUpdateFormComponent,
    NurseOncallCardComponent,
    NurseAppointmentListComponent,
    NurseAppointmentAddFormComponent,
    NurseAppointmentDeleteComponent,
    NurseAppointmentUpdateFromComponent,
    PhysicianAppointmentListComponent,
    PhysicianAppointmentPrescribedCardComponent,
    PhysicianAppointmentPrescribedAddFormComponent,
    PhysicianAppointmentPrescribedDeleteComponent,
    PhysicianAppointmentPrescribedUpdateFormComponent,
    NavigationBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot()
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
