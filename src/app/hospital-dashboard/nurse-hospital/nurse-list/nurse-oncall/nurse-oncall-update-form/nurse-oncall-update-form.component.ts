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
  selector: 'app-nurse-oncall-update-form',
  templateUrl: './nurse-oncall-update-form.component.html',
  styleUrls: ['./nurse-oncall-update-form.component.css']
})
export class NurseOncallUpdateFormComponent {
  constructor(
    private dialogRef : MatDialogRef<NurseOncallCardComponent>,
    private OncallPutApi : OncallApiService,
    private blockGetByIdApi:BlockApiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }
  onCallUpdateForm : FormGroup
  blocks
  ngOnInit(): void {
    this.setBlock()
    // console.log(this.data.oncallData)
    this.onCallUpdateForm = this.fb.group({
      blockId:[this.data.oncallData.block.blockId,[Validators.required]],
      onCallStart:[this.data.oncallData.onCallStart,[Validators.required]],
      onCallEnd:[this.data.oncallData.onCallEnd,[Validators.required]],
    })
  }
  addNewOncall() {
    this.spinner.show();

    let oncall:Oncall=this.onCallUpdateForm.value
    oncall.nurseId=this.data.oncallData.nurse.nurseId
    oncall.onCallId=this.data.oncallData.onCallId
    this.OncallPutApi.putOncall(oncall).subscribe((data:ResponseMessage)=>{
      this.spinner.hide();

      this.toastr.success(data.message,'',{
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
      console.log(data)
      this.dialogRef.close();
    });
  }
  setBlock(){
      this.blockGetByIdApi.getAllBlock().subscribe(data=>{
        this.blocks=data
        this.spinner.hide();

      })
  }
}
