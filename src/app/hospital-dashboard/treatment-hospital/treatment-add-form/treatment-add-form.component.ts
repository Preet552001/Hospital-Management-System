import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TreatmentApiService} from '../../../service/treatment.service'
import { TreatmentPost } from '../../../interface/treatmentPost';
import { MatDialogRef } from "@angular/material/dialog";
import { TreatmentListComponent } from '../treatment-list/treatment-list.component';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-treatment-add-form',
  templateUrl: './treatment-add-form.component.html',
  styleUrls: ['./treatment-add-form.component.css']
})
export class TreatmentAddFormComponent {
  constructor(
    private treatmentPostNewApi: TreatmentApiService,
    public dialogRef: MatDialogRef<TreatmentListComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  treatmentRegistrationForm : FormGroup
  
  ngOnInit(): void {
    this.treatmentRegistrationForm = this.fb.group({
      name:['',[Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      cost:['',[Validators.required, Validators.pattern('[0-9]+')]]
    })
  }
  
  addNewPhysician() {
    this.spinner.show();

    let newTreatment:TreatmentPost=this.treatmentRegistrationForm.value
    this.treatmentPostNewApi.postTreatment(newTreatment).subscribe((data:ResponseMessage)=>{
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
