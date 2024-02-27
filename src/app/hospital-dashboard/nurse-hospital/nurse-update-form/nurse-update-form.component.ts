import { Component, Inject } from '@angular/core';
import { NurseApiService } from '../../../service/nurse-api.service';
import { Nurse } from '../../../interface/nurse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NurseListComponent } from '../nurse-list/nurse-list.component';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse-update-form',
  templateUrl: './nurse-update-form.component.html',
  styleUrls: ['./nurse-update-form.component.css']
})
export class NurseUpdateFormComponent {
  constructor(
    private nursePutApi: NurseApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NurseListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  nurseUpdateForm : FormGroup

  ngOnInit(): void {
    this.nurseUpdateForm = this.fb.group({
      // nurseId:[{value: this.data.nurseData.nurseId, disabled:true},[Validators.required]],
      name:[this.data.nurseData.name,[Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      position:[this.data.nurseData.position,[Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    })
  }
  updateNurse() {
    this.spinner.show();

    let nurse:Nurse=this.nurseUpdateForm.value
    nurse.nurseId=this.data.nurseData.nurseId
    nurse.registered=true
    this.nursePutApi.putNurse(nurse).subscribe((data:ResponseMessage)=>{
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
