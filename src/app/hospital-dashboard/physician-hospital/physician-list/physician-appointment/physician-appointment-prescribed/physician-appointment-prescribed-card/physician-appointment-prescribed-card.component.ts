import { Component, Inject, ViewChild } from '@angular/core';
import { PrescribedApiService } from '../../../../../../service/prescribed-api.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import {PhysicianAppointmentListComponent} from '../../physician-appointment-list/physician-appointment-list.component'
import {PhysicianAppointmentPrescribedAddFormComponent} from '../physician-appointment-prescribed-add-form/physician-appointment-prescribed-add-form.component'
import {PhysicianAppointmentPrescribedDeleteComponent} from '../physician-appointment-prescribed-delete/physician-appointment-prescribed-delete.component'
import {PhysicianAppointmentPrescribedUpdateFormComponent} from '../physician-appointment-prescribed-update-form/physician-appointment-prescribed-update-form.component'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-appointment-prescribed-card',
  templateUrl: './physician-appointment-prescribed-card.component.html',
  styleUrls: ['./physician-appointment-prescribed-card.component.css']
})
export class PhysicianAppointmentPrescribedCardComponent {
  constructor(
    private prescribedGetApi: PrescribedApiService,
    public dialogRef: MatDialogRef<PhysicianAppointmentListComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }
  ngOnInit(): void {
    // console.log(this.data.appointment)
    this.getprescription()
  }
  prescription
  getprescription(){
    this.prescribedGetApi.getPrescribedByAppointmentId(this.data.appointment.appointmentId).subscribe(data=>{
      this.prescription=data
      console.log(data)
      this.spinner.hide();

    })
  }
  openDialogForAddPrescription(){
    const dialogRef = this.dialog.open(PhysicianAppointmentPrescribedAddFormComponent, {
      data: { appointment: this.data.appointment, physicianId : this.data.physicianId },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getprescription()
    });
  }
  openDialogForEditingPrescription(){
    const dialogRef = this.dialog.open(PhysicianAppointmentPrescribedUpdateFormComponent, {
      data: { prescription:  this.prescription, appointmentId:this.data.appointment.appointmentId},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getprescription()
    });
  }
  openDialogForDeletePrescription(){
    const dialogRef = this.dialog.open(PhysicianAppointmentPrescribedDeleteComponent, {
      data: { prescription:  this.prescription, appointmentId:this.data.appointment.appointmentId},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getprescription()
    });
  }
}
