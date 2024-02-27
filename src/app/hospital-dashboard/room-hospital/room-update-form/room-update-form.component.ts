import { Component, Inject } from '@angular/core';
import { RoomApiService } from '../../../service/room-api.service';
import { Room } from '../../../interface/room';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockApiService } from '../../../service/block-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {RoomListComponent} from '../room-list/room-list.component'
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-room-update-form',
  templateUrl: './room-update-form.component.html',
  styleUrls: ['./room-update-form.component.css']
})
export class RoomUpdateFormComponent {
  constructor(
    private roomPostApi: RoomApiService,
    private blockGetApi: BlockApiService,
    public dialogRef: MatDialogRef<RoomListComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,


  ) {
    this.spinner.show();

  }
  roomRegistrationForm : FormGroup
  blocks
  ngOnInit(): void {
    this.setBlock()
    this.roomRegistrationForm = this.fb.group({
      // roomId:[{value: this.data.roomData.roomId, disabled:true},[Validators.required]],
      roomNumber:[this.data.roomData.roomNumber,[Validators.required,Validators.pattern('[0-9]+')]],
      roomType:[this.data.roomData.roomType,[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      // availability:[{value: this.data.roomData.availability, disabled:true},[Validators.required]],
      blockId:[this.data.roomData.block.blockId,[Validators.required]],
    })
  }
  updateRoom() {
    this.spinner.show();

    let room:Room=this.roomRegistrationForm.value
    room.roomId=this.data.roomData.roomId
    room.availability=this.data.roomData.availability
    this.roomPostApi.putRoom(room).subscribe((data:ResponseMessage)=>{
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
    this.blockGetApi.getAllBlock().subscribe((data)=>{
      this.blocks=data
      this.spinner.hide();

    })
  }

}
