import { Component } from '@angular/core';
import { NurseApiService } from '../../../service/nurse-api.service';
import { NursePost } from '../../../interface/nursePost';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { NurseListComponent } from '../nurse-list/nurse-list.component';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse-add-form',
  templateUrl: './nurse-add-form.component.html',
  styleUrls: ['./nurse-add-form.component.css'],
})
export class NurseAddFormComponent {
  constructor(
    private nursePostNewApi: NurseApiService,
    public dialogRef: MatDialogRef<NurseListComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  nurseRegistrationForm : FormGroup

  ngOnInit(): void {
    this.nurseRegistrationForm = this.fb.group({
      name:['',[Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      position:['',[Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    })
  }
  addNewNurse() {
    this.spinner.show();

    let newNurse:NursePost=this.nurseRegistrationForm.value
    this.nursePostNewApi.postNurse(newNurse).subscribe((data:ResponseMessage)=>{
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
