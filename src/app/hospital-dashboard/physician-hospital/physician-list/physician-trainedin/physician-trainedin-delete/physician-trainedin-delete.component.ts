import { Component, Inject } from '@angular/core';
import { TrainedInApiService } from '../../../../../service/trainedin-api.service';
import { TrainedIn } from '../../../../../interface/trainedin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PhysicianTrainedinListComponent } from '../physician-trainedin-list/physician-trainedin-list.component';
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-trainedin-delete',
  templateUrl: './physician-trainedin-delete.component.html',
  styleUrls: ['./physician-trainedin-delete.component.css']
})
export class PhysicianTrainedinDeleteComponent {
  constructor(
    private dialogRef : MatDialogRef<PhysicianTrainedinListComponent>,
    private trainedInDeleteApi: TrainedInApiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}

  deleteTrainedIn(){
    this.spinner.show();

    let trainedIn:TrainedIn={id:0,physician:0,treatment:0,certificationDate:'', certificationExpires:''}
    console.log(this.data)
    trainedIn.physician=this.data.physicianId
    trainedIn.id=this.data.trainedinData.trainedInId
    trainedIn.treatment=this.data.trainedinData.treatment.procedureId
    trainedIn.certificationDate=this.data.trainedinData.certificationDate
    trainedIn.certificationExpires=this.data.trainedinData.certificationExpires
    console.log(trainedIn)
    this.trainedInDeleteApi.deleteTrainedIn(trainedIn).subscribe((data:ResponseMessage)=>{
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
