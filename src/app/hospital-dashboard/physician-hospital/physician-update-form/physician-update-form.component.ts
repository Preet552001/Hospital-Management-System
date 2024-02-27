import { Component, Inject } from '@angular/core';
import { PhysicianApiService } from '../../../service/physician-api.service';
import { Physician } from '../../../interface/physician';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PhysicianListComponent } from '../physician-list/physician-list.component';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-update-form',
  templateUrl: './physician-update-form.component.html',
  styleUrls: ['./physician-update-form.component.css']
})
export class PhysicianUpdateFormComponent {
  constructor(
    private physicianPutApi: PhysicianApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PhysicianListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  physicianUpdateForm : FormGroup

  ngOnInit(): void {
    // console.log(this.data.physicianData.physicianId)
    this.physicianUpdateForm = this.fb.group({
      // physicianId:[{value: this.data.physicianData.physicianId, disabled:true},[Validators.required]],
      name:[this.data.physicianData.name,[Validators.required,Validators.minLength(5), Validators.pattern('[a-zA-Z .]*')]],
      position:[this.data.physicianData.position,[Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    })
  }

  

  updatePhysician() {
    this.spinner.show();
    let physician:Physician=this.physicianUpdateForm.value
    physician.physicianId=this.data.physicianData.physicianId
    // console.log(newPhysician)
    this.physicianPutApi.putPhysician(physician).subscribe((data:ResponseMessage)=>{
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
