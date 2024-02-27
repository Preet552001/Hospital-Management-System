import { Component } from '@angular/core';
import { PhysicianApiService } from '../../../service/physician-api.service';
import { PhysicianPost } from '../../../interface/physicianPost';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { PhysicianListComponent } from '../physician-list/physician-list.component';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-add-form',
  templateUrl: './physician-add-form.component.html',
  styleUrls: ['./physician-add-form.component.css'],
})
export class PhysicianAddFormComponent {
  constructor(
    private dialogRef : MatDialogRef<PhysicianListComponent>,
    private physicianPostNewApi: PhysicianApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  physicianRegistrationForm : FormGroup

  ngOnInit(): void {
    this.physicianRegistrationForm = this.fb.group({
      name:['Dr. ',[Validators.required,Validators.minLength(5), Validators.pattern('[a-zA-Z .]*')]],
      position:['',[Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    })
  }
  addNewPhysician() {
    this.spinner.show();

    let newPhysician:PhysicianPost=this.physicianRegistrationForm.value
    this.physicianPostNewApi.postPhysician(newPhysician).subscribe((data:ResponseMessage)=>{
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
