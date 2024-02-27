import { Component, Inject } from '@angular/core';
import { TrainedInApiService } from '../../../../../service/trainedin-api.service';
import { TrainedInPost } from '../../../../../interface/trainedinPost';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PhysicianTrainedinListComponent } from '../physician-trainedin-list/physician-trainedin-list.component';
import {TreatmentApiService} from '../../../../../service/treatment.service'
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-trainedin-add-form',
  templateUrl: './physician-trainedin-add-form.component.html',
  styleUrls: ['./physician-trainedin-add-form.component.css'],
})
export class PhysicianTrainedinAddFormComponent {
  constructor(
    private dialogRef : MatDialogRef<PhysicianTrainedinListComponent>,
    private trainedInPostNewApi: TrainedInApiService,
    private treatmentGetByIdApi:TreatmentApiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();
  }
  trainedInRegistrationForm : FormGroup
  treatments
  ngOnInit(): void {
    this.setTreatment()
    this.trainedInRegistrationForm = this.fb.group({
      treatmentId:['',[Validators.required]],
      certificationDate:[Date,[Validators.required]],
      certificationExpires:[Date,[Validators.required]],
    })
  }
  addNewPhysician() {
    this.spinner.show();

    let newTrainedId:TrainedInPost=this.trainedInRegistrationForm.value
    newTrainedId.physician=this.data.physicianId
    newTrainedId.treatment=Number(this.trainedInRegistrationForm.value.treatmentId)
    console.log(newTrainedId)
    this.trainedInPostNewApi.postTrainedIn(newTrainedId).subscribe((data:ResponseMessage)=>{
      this.spinner.hide();

      this.toastr.success(data.message,'',{
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
      console.log(data)
      this.dialogRef.close();
    });
  }
  setTreatment(){
    this.treatmentGetByIdApi.getAllTreatment().subscribe((data)=>{
      this.treatments=data
      this.spinner.hide();
    })
  }
}
