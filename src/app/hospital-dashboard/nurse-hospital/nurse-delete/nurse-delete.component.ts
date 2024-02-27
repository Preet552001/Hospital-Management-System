import { Component, Inject } from '@angular/core';
import { NurseApiService } from '../../../service/nurse-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NurseListComponent } from '../nurse-list/nurse-list.component';
import { Nurse } from 'src/app/interface/nurse';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse-delete',
  templateUrl: './nurse-delete.component.html',
  styleUrls: ['./nurse-delete.component.css']
})
export class NurseDeleteComponent {
  constructor(
    private nurseDeleteApi: NurseApiService,
    public dialogRef: MatDialogRef<NurseListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  deleteNurse(){
    this.spinner.show();

    let nurse:Nurse={nurseId:0,name:"",position:"",registered:true}
    nurse.nurseId=this.data.nurseData.nurseId
    nurse.name=this.data.nurseData.name
    nurse.position=this.data.nurseData.position
    nurse.registered=this.data.nurseData.registered
    this.nurseDeleteApi.deleteNurse(nurse).subscribe((data:ResponseMessage)=>{
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
