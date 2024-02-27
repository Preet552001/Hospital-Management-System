import { Component, Inject } from '@angular/core';
import { PrescribedApiService } from '../../../../../../service/prescribed-api.service';
import { MedicationApiService } from '../../../../../../service/medication-api.service';

import { PrescribedPost } from '../../../../../../interface/prescribedPost';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { PhysicianAppointmentPrescribedCardComponent } from '../physician-appointment-prescribed-card/physician-appointment-prescribed-card.component';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-appointment-prescribed-add-form',
  templateUrl: './physician-appointment-prescribed-add-form.component.html',
  styleUrls: ['./physician-appointment-prescribed-add-form.component.css']
})
export class PhysicianAppointmentPrescribedAddFormComponent {
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
      medication:['',[Validators.required]],
      dose:['',[Validators.required,Validators.pattern('[0-9]')]],
      date:['',[Validators.required]],
    })
  }
  addNewPrescribed() {
    this.spinner.show();

    let prescribed:PrescribedPost=this.prescribedRegistrationForm.value
    prescribed.appointment=this.data.appointment.appointmentId
    prescribed.patient=this.data.appointment.patient.patientId
    prescribed.physician=this.data.physicianId
    
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
