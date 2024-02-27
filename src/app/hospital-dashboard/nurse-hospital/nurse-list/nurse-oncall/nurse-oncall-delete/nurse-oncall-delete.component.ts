import { Component, Inject } from '@angular/core';
import { OncallApiService } from '../../../../../service/oncall-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NurseOncallCardComponent } from '../nurse-oncall-card/nurse-oncall-card.component';
import {BlockApiService} from '../../../../../service/block-api.service'
import { Oncall } from 'src/app/interface/oncall';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse-oncall-delete',
  templateUrl: './nurse-oncall-delete.component.html',
  styleUrls: ['./nurse-oncall-delete.component.css']
})
export class NurseOncallDeleteComponent {

  constructor(
    private dialogRef : MatDialogRef<NurseOncallCardComponent>,
    private OncallDeleteApi : OncallApiService,
    private blockGetByIdApi:BlockApiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  deleteOncall() {
    this.spinner.show();

    let oncall:Oncall={onCallId:0,nurseId:0,blockId:0,onCallStart:'',onCallEnd:''}
    oncall.onCallId=this.data.oncallData.onCallId
    oncall.nurseId=this.data.oncallData.nurse.nurseId
    oncall.blockId=this.data.oncallData.block.blockId
    oncall.onCallStart=this.data.oncallData.onCallStart
    oncall.onCallEnd=this.data.oncallData.onCallEnd
    this.OncallDeleteApi.deleteOncall(oncall).subscribe((data:ResponseMessage)=>{
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
