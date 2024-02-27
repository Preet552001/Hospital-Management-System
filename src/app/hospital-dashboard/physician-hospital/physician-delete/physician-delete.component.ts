import { Component, Inject } from '@angular/core';
import { PhysicianApiService } from '../../../service/physician-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PhysicianListComponent } from '../physician-list/physician-list.component';
import { Physician } from 'src/app/interface/physician';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-delete',
  templateUrl: './physician-delete.component.html',
  styleUrls: ['./physician-delete.component.css']
})
export class PhysicianDeleteComponent {
  constructor(
    private physicianDeleteApi: PhysicianApiService,
    public dialogRef: MatDialogRef<PhysicianListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  deletePhysician(){
    this.spinner.show();

    let physician:Physician={physicianId:0,name:'',position:''}
    physician.name=this.data.physicianData.name
    physician.physicianId=this.data.physicianData.physicianId
    physician.position=this.data.physicianData.position
    // console.log(this.data.physicianData.name)
    // console.log(physician)
    this.physicianDeleteApi.deletePhysician(physician).subscribe((data:ResponseMessage)=>{
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
