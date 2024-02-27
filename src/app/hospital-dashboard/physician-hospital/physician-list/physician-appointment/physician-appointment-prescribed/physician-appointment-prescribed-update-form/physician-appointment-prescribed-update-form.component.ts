import { Component, Inject } from '@angular/core';
import { PrescribedApiService } from '../../../../../../service/prescribed-api.service';
import { MedicationApiService } from '../../../../../../service/medication-api.service';
import { Prescribed } from '../../../../../../interface/prescribed';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { PhysicianAppointmentPrescribedCardComponent } from '../physician-appointment-prescribed-card/physician-appointment-prescribed-card.component';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-appointment-prescribed-update-form',
  templateUrl: './physician-appointment-prescribed-update-form.component.html',
  styleUrls: ['./physician-appointment-prescribed-update-form.component.css']
})
export class PhysicianAppointmentPrescribedUpdateFormComponent {
  constructor(
    private dialogRef : MatDialogRef<PhysicianAppointmentPrescribedCardComponent>,
    private prescribedPostApi: PrescribedApiService,
    private medicationGetApi: MedicationApiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();
  }
  prescribedRegistrationForm : FormGroup
  medications
  ngOnInit(): void {
    this.setMedication()
    this.prescribedRegistrationForm = this.fb.group({
      medication:[this.data.prescription.medication.medicationId,[Validators.required]],
      dose:[this.data.prescription.dose,[Validators.required,Validators.pattern('[0-9]')]],
      date:[this.data.prescription.createdOn,[Validators.required]],
    })
  }
  addNewPrescribed() {
    this.spinner.show();
    let prescribed:Prescribed=this.prescribedRegistrationForm.value
    prescribed.appointment=this.data.appointmentId
    prescribed.patient=this.data.prescription.patientId
    prescribed.physician=this.data.prescription.physician.physicianId
    prescribed.id=this.data.prescription.prescribedId
    this.prescribedPostApi.postPrescribed(prescribed).subscribe((data:ResponseMessage)=>{
      this.spinner.hide();

      this.toastr.success(data.message,'',{
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
      console.log(data)
      this.dialogRef.close();
    });
  }
  setMedication(){
    this.medicationGetApi.getAllMedication().subscribe(data=>{
      this.medications=data
      this.spinner.hide();

    })
  }
}
