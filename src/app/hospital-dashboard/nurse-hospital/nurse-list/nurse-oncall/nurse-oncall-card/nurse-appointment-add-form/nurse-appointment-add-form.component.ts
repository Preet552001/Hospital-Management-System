import { Component, Inject } from '@angular/core';
import { PatientApiService } from '../../../../../../service/patient-api.service';
import { PhysicianApiService } from '../../../../../../service/physician-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {AppointmentApiService} from '../../../../../../service/appointment-api.service'
import { AppointmentPost } from 'src/app/interface/appointmentPost';
import {NurseAppointmentListComponent} from '../nurse-appointment-list/nurse-appointment-list.component'
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse-appointment-add-form',
  templateUrl: './nurse-appointment-add-form.component.html',
  styleUrls: ['./nurse-appointment-add-form.component.css']
})
export class NurseAppointmentAddFormComponent {
  constructor(
    private dialogRef : MatDialogRef<NurseAppointmentListComponent>,
    private appointmentPostApi : AppointmentApiService,
    private patientGetApi:PatientApiService,
    private physicianGetApi:PhysicianApiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }
  appointmentRegistrationForm : FormGroup

  patients
  physicians
  ngOnInit(): void {
    this.setPatients()
    this.setPhysicians()
    this.appointmentRegistrationForm = this.fb.group({
      patientId:['',[Validators.required]],
      physicianId:['',[Validators.required]],
      startDateTime:[Date,[Validators.required]],
      endDateTime:[Date,[Validators.required]],
    })
  }
  addNewAppointment() {
    this.spinner.show();

    let appointment:AppointmentPost=this.appointmentRegistrationForm.value
    appointment.onCallId=this.data.oncallId
    // newTrainedId.physician=this.data.physicianId
    // newTrainedId.treatment=Number(this.onCallRegistrationForm.value.treatmentId)
    console.log(appointment)
    this.appointmentPostApi.postAppointment(appointment).subscribe((data:ResponseMessage)=>{
      this.spinner.hide();

      this.toastr.success(data.message,'',{
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
      console.log(data)
      this.dialogRef.close();
    });
  }
  setPatients(){
    this.patientGetApi.getAllPatient().subscribe(data=>{
      this.patients=data
      this.spinner.hide();

    })
  }

  setPhysicians(){
    this.physicianGetApi.getAllPhysician().subscribe(data=>{
      this.physicians=data
      this.spinner.hide();

    })
  }
}
