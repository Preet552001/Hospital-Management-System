import { Component } from '@angular/core';
import { BlockApiService } from '../../../service/block-api.service';
import { BlockPost } from '../../../interface/blockPost';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BlockListComponent } from '../block-list/block-list.component';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-block-add-form',
  templateUrl: './block-add-form.component.html',
  styleUrls: ['./block-add-form.component.css']
})
export class BlockAddFormComponent {
  constructor(
    private blockPostNewApi: BlockApiService,
    public dialogRef: MatDialogRef<BlockListComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {}
  blockRegistrationForm : FormGroup

  ngOnInit(): void {
    this.blockRegistrationForm = this.fb.group({
      blockFloor:['',[Validators.required,Validators.pattern('[0-9]+')]],
      blockCode:['',[Validators.required,Validators.pattern('[0-9]+')]]
    })
  }
  addNewBlock() {
    this.spinner.show();

    let newBlock:BlockPost=this.blockRegistrationForm.value
    this.blockPostNewApi.postBlock(newBlock).subscribe((data:ResponseMessage)=>{
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
