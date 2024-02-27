import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhysicianListComponent } from './hospital-dashboard/physician-hospital/physician-list/physician-list.component';
import { TreatmentListComponent } from './hospital-dashboard/treatment-hospital/treatment-list/treatment-list.component';
import { NurseListComponent } from './hospital-dashboard/nurse-hospital/nurse-list/nurse-list.component';
import { PatientListComponent } from './hospital-dashboard/patient-hospital/patient-list/patient-list.component';
import { BlockListComponent } from './hospital-dashboard/block-hospital/block-list/block-list.component';
import { RoomListComponent } from './hospital-dashboard/room-hospital/room-list/room-list.component';
import { HospitalDashboardComponent } from './hospital-dashboard/hospital-dashboard.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
const routes: Routes = [
  { path: '', component: HospitalDashboardComponent },
  { path: 'physician', component: PhysicianListComponent },
  { path: 'treatment', component: TreatmentListComponent },
  { path: 'nurse', component: NurseListComponent },
  { path: 'patient', component: PatientListComponent },
  { path: 'block', component: BlockListComponent },
  { path: 'room', component: RoomListComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
