import { Component, Inject } from '@angular/core';
import { BlockApiService } from '../../../service/block-api.service';
import { Block } from '../../../interface/block';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BlockListComponent } from '../block-list/block-list.component';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-block-update-form',
  templateUrl: './block-update-form.component.html',
  styleUrls: ['./block-update-form.component.css']
})
export class BlockUpdateFormComponent {
  constructor(
    private blockPutApi: BlockApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BlockListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  blockUpdateForm : FormGroup

  ngOnInit(): void {
    // console.log(this.data.blockData.blockId)
    this.blockUpdateForm = this.fb.group({
      // blockId:[{value: this.data.blockData.blockId, disabled:true},[Validators.required]],
      blockFloor:[this.data.blockData.blockFloor,[Validators.required,Validators.pattern('[0-9]+')]],
      blockCode:[this.data.blockData.blockCode,[Validators.required,Validators.pattern('[0-9]+')]],
    })
  }
  updateBlock() {
    this.spinner.show();
    let block:Block=this.blockUpdateForm.value
    block.blockId=this.data.blockData.blockId
    this.blockPutApi.putBlock(block).subscribe((data:ResponseMessage)=>{
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
