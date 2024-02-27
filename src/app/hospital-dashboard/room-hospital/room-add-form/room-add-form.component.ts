import { Component } from '@angular/core';
import { RoomApiService } from '../../../service/room-api.service';
import { RoomPost } from '../../../interface/roomPost';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockApiService } from '../../../service/block-api.service'
import { MatDialogRef } from "@angular/material/dialog";
import {RoomListComponent} from '../room-list/room-list.component'
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-room-add-form',
  templateUrl: './room-add-form.component.html',
  styleUrls: ['./room-add-form.component.css']
})
export class RoomAddFormComponent {
  constructor(
    private roomPostNewApi: RoomApiService,
    public dialogRef: MatDialogRef<RoomListComponent>,
    private blockGetApi: BlockApiService,
    private fb: FormBuilder,
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
      roomNumber:['',[Validators.required,Validators.pattern('[0-9]+')]],
      roomType:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      blockId:['',[Validators.required]],
    })
  }
  addNewRoom() {
    this.spinner.show();

    let newRoom:RoomPost=this.roomRegistrationForm.value
    newRoom.availability=true
    this.roomPostNewApi.postRoom(newRoom).subscribe((data:ResponseMessage)=>{
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
