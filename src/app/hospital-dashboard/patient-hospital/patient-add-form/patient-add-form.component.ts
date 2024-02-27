import { Component } from '@angular/core';
import { PatientApiService } from '../../../service/patient-api.service';
import { PatientPost } from '../../../interface/patientPost';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { PatientListComponent } from '../patient-list/patient-list.component';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-patient-add-form',
  templateUrl: './patient-add-form.component.html',
  styleUrls: ['./patient-add-form.component.css']
})
export class PatientAddFormComponent {
  constructor(
    private patientPostNewApi: PatientApiService,
    public dialogRef: MatDialogRef<PatientListComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  patientRegistrationForm : FormGroup

  ngOnInit(): void {
    this.patientRegistrationForm = this.fb.group({
      name:['',[Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      address:['',[Validators.required]],
      phone:['+',[Validators.required,Validators.pattern('[0-9+]+'),Validators.minLength(11),Validators.maxLength(11)]]
    })
  }
  addNewPatient() {
    this.spinner.show();

    let newPatient:PatientPost=this.patientRegistrationForm.value
    this.patientPostNewApi.postPatient(newPatient).subscribe((data:ResponseMessage)=>{
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
