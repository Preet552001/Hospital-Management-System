import { Component, Inject } from '@angular/core';
import { OncallApiService } from '../../../../../service/oncall-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NurseOncallCardComponent } from '../nurse-oncall-card/nurse-oncall-card.component';
import {BlockApiService} from '../../../../../service/block-api.service'
import { OncallPost } from 'src/app/interface/oncallPost';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse-oncall-add-form',
  templateUrl: './nurse-oncall-add-form.component.html',
  styleUrls: ['./nurse-oncall-add-form.component.css']
})
export class NurseOncallAddFormComponent {
  constructor(
    private dialogRef : MatDialogRef<NurseOncallCardComponent>,
    private OncallPostApi : OncallApiService,
    private blockGetByIdApi:BlockApiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }
  onCallRegistrationForm : FormGroup
  blocks
  ngOnInit(): void {
    this.setBlock()
    this.onCallRegistrationForm = this.fb.group({
      blockId:['',[Validators.required]],
      onCallStart:[Date,[Validators.required]],
      onCallEnd:[Date,[Validators.required]],
    })
  }
  addNewOncall() {
    this.spinner.show();

    let newOncall:OncallPost=this.onCallRegistrationForm.value
    newOncall.nurseId=this.data.nurseId
    // newTrainedId.physician=this.data.physicianId
    // newTrainedId.treatment=Number(this.onCallRegistrationForm.value.treatmentId)
    // console.log(newOncall)
    this.OncallPostApi.postOncall(newOncall).subscribe((data:ResponseMessage)=>{
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
