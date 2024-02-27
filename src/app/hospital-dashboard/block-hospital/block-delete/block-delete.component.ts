import { Component, Inject } from '@angular/core';
import { BlockApiService } from '../../../service/block-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlockListComponent } from '../block-list/block-list.component';
import { Block } from '../../../interface/block';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-block-delete',
  templateUrl: './block-delete.component.html',
  styleUrls: ['./block-delete.component.css']
})
export class BlockDeleteComponent {
  constructor(
    private blockDeleteApi: BlockApiService,
    public dialogRef: MatDialogRef<BlockListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  deleteBlock(){
    this.spinner.show();
    let block:Block={blockId:0,blockFloor:0,blockCode:0}
    block.blockId=this.data.blockData.blockId
    block.blockFloor=this.data.blockData.blockFloor
    block.blockCode=this.data.blockData.blockCode
    console.log(block)
    this.blockDeleteApi.deleteBlock(block).subscribe((data:ResponseMessage)=>{
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
