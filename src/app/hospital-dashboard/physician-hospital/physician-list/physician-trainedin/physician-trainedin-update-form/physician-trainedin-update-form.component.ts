import { Component, Inject } from '@angular/core';
import { TrainedInApiService } from '../../../../../service/trainedin-api.service';
import { TrainedIn } from '../../../../../interface/trainedin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PhysicianTrainedinListComponent } from '../physician-trainedin-list/physician-trainedin-list.component';
import {TreatmentApiService} from '../../../../../service/treatment.service'
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-trainedin-update-form',
  templateUrl: './physician-trainedin-update-form.component.html',
  styleUrls: ['./physician-trainedin-update-form.component.css']
})
export class PhysicianTrainedinUpdateFormComponent {
  constructor(
    private dialogRef : MatDialogRef<PhysicianTrainedinListComponent>,
    private trainedInPutApi: TrainedInApiService,
    private treatmentGetByIdApi:TreatmentApiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();
  }
  trainedInUpdateForm : FormGroup
  treatments
  ngOnInit(): void {
    this.setTreatmentName()
    console.log(this.data)
    this.trainedInUpdateForm = this.fb.group({
      treatmentId:[this.data.trainedinData.treatment.procedureId,[Validators.required]],
      certificationDate:[this.data.trainedinData.certificationDate,[Validators.required]],
      certificationExpires:[this.data.trainedinData.certificationExpires,[Validators.required]],
    })
  }
  updatePhysician() {
    this.spinner.show();

    let trainedIn:TrainedIn=this.trainedInUpdateForm.value
    trainedIn.physician=this.data.physicianId
    trainedIn.id=this.data.trainedinData.trainedInId
    trainedIn.treatment=Number(this.trainedInUpdateForm.value.treatmentId)
    console.log(trainedIn)
    this.trainedInPutApi.putTrainedIn(trainedIn).subscribe((data:ResponseMessage)=>{
      this.spinner.hide();

      this.toastr.success(data.message,'',{
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
      console.log(data)
      this.dialogRef.close();
    });
  }
  setTreatmentName(){
    this.treatmentGetByIdApi.getAllTreatment().subscribe((data)=>{
      this.treatments=data
      this.spinner.hide();
    })
  }
}
