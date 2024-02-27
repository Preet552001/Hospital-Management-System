import { Component, Inject } from '@angular/core';
import { RoomApiService } from '../../../service/room-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomListComponent } from '../room-list/room-list.component';
import { Room } from 'src/app/interface/room';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-room-delete',
  templateUrl: './room-delete.component.html',
  styleUrls: ['./room-delete.component.css']
})
export class RoomDeleteComponent {
  constructor(
    private roomDeleteApi: RoomApiService,
    public dialogRef: MatDialogRef<RoomListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  deleteRoom(){
    this.spinner.show();

    let room:Room={roomId:0,roomNumber:0,roomType:'',availability:true,blockId:0}
    room.roomId=this.data.roomData.roomId
    room.roomNumber=this.data.roomData.roomNumber
    room.roomType=this.data.roomData.roomType
    room.availability=this.data.roomData.availability
    room.blockId=this.data.roomData.block.blockId
    this.roomDeleteApi.deleteRoom(room).subscribe((data:ResponseMessage)=>{
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
