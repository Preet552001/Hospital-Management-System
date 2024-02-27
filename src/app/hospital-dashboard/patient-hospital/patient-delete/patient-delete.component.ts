import { Component, Inject } from '@angular/core';
import { PatientApiService } from '../../../service/patient-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientListComponent } from '../patient-list/patient-list.component';
import { Patient } from 'src/app/interface/patient';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-patient-delete',
  templateUrl: './patient-delete.component.html',
  styleUrls: ['./patient-delete.component.css']
})
export class PatientDeleteComponent {
  constructor(
    private patientDeleteApi: PatientApiService,
    public dialogRef: MatDialogRef<PatientListComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data,
    private spinner: NgxSpinnerService,

  ) {}
  deletePatient(){
    this.spinner.show();

    let patient:Patient={patientId:0,name:'',address:'',phone:''}
    patient.patientId=this.data.patientData.patientId
    patient.name=this.data.patientData.name
    patient.address=this.data.patientData.address
    patient.phone=this.data.patientData.phone
    this.patientDeleteApi.deletePatient(patient).subscribe((data:ResponseMessage)=>{
      this.spinner.hide();

      this.toastr.success(data.message,'',{
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
      console.log(data)
      this.dialogRef.close();
    })
  }
}
