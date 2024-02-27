import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {TreatmentApiService} from '../../../service/treatment.service'
import {TreatmentListComponent} from '../treatment-list/treatment-list.component'
import { Treatment } from 'src/app/interface/treatment';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-treatment-delete',
  templateUrl: './treatment-delete.component.html',
  styleUrls: ['./treatment-delete.component.css']
})
export class TreatmentDeleteComponent {
  constructor(
    private treatmentDeleteApi: TreatmentApiService,
    public dialogRef: MatDialogRef<TreatmentListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  deleteTreatment(){
    this.spinner.show();

    let treatment:Treatment={procedureId:0,name:'',cost:0}
    treatment.procedureId=this.data.treatmentData.procedureId
    treatment.name=this.data.treatmentData.name
    treatment.cost=this.data.treatmentData.cost
    console.log(treatment)
    this.treatmentDeleteApi.deleteTreatment(treatment).subscribe((data:ResponseMessage)=>{
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
