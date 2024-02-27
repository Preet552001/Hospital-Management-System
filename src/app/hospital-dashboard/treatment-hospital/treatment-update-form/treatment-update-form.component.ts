import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TreatmentApiService} from '../../../service/treatment.service'
import {Treatment} from '../../../interface/treatment'
import {TreatmentListComponent} from '../treatment-list/treatment-list.component'
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-treatment-update-form',
  templateUrl: './treatment-update-form.component.html',
  styleUrls: ['./treatment-update-form.component.css']
})
export class TreatmentUpdateFormComponent {
  constructor(
    private treatmentPutApi: TreatmentApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TreatmentListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  treatmentUpdateForm : FormGroup

  ngOnInit(): void {
    this.treatmentUpdateForm = this.fb.group({
      // treatmentId:[{value: this.data.treatmentData.procedureId, disabled:true},[Validators.required]],
      name:[this.data.treatmentData.name,[Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      cost:[this.data.treatmentData.cost,[Validators.required, Validators.pattern('[0-9]+')]]
    })
  }
  updateTreatment() {
    this.spinner.show();

    let treatment:Treatment=this.treatmentUpdateForm.value
    treatment.procedureId=this.data.treatmentData.procedureId
    this.treatmentPutApi.putTreatment(treatment).subscribe((data:ResponseMessage)=>{
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
