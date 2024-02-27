import { Component, Inject } from '@angular/core';
import { PatientApiService } from '../../../service/patient-api.service';
import { Patient } from '../../../interface/patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PatientListComponent } from '../patient-list/patient-list.component';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-patient-update-form',
  templateUrl: './patient-update-form.component.html',
  styleUrls: ['./patient-update-form.component.css']
})
export class PatientUpdateFormComponent {
  constructor(
    private patientPutApi: PatientApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PatientListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  patientUpdateForm : FormGroup

  ngOnInit(): void {
    this.patientUpdateForm = this.fb.group({
      // patientId:[{value: this.data.patientData.patientId, disabled:true},[Validators.required]],
      name:[this.data.patientData.name,[Validators.required,Validators.pattern('[a-z A-Z ]*')]],
      address:[this.data.patientData.address,[Validators.required]],
      phone:[this.data.patientData.phone,[Validators.required,Validators.pattern('[0-9+]+'),Validators.minLength(11),Validators.maxLength(11)]],
    })
  }
  updatePatient() {
    this.spinner.show();

    let patient:Patient=this.patientUpdateForm.value
    patient.patientId=this.data.patientData.patientId
    this.patientPutApi.putPatient(patient).subscribe((data:ResponseMessage)=>{
      this.spinner.hide();

      this.toastr.success(data.message,'',{
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
      console.log(data)
      this.dialogRef.close();
    });
  }

}
