import { Component, Inject } from '@angular/core';
import { PatientApiService } from '../../../../../../service/patient-api.service';
import { PhysicianApiService } from '../../../../../../service/physician-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {AppointmentApiService} from '../../../../../../service/appointment-api.service'
import { Appointment } from 'src/app/interface/appointment';
import {NurseAppointmentListComponent} from '../nurse-appointment-list/nurse-appointment-list.component'
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse-appointment-update-from',
  templateUrl: './nurse-appointment-update-from.component.html',
  styleUrls: ['./nurse-appointment-update-from.component.css']
})
export class NurseAppointmentUpdateFromComponent {
  constructor(
    private dialogRef : MatDialogRef<NurseAppointmentListComponent>,
    private appointmentPutApi : AppointmentApiService,
    private patientGetApi:PatientApiService,
    private physicianGetApi:PhysicianApiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();
  }
  appointmentUpdateForm : FormGroup

  patients
  physicians
  ngOnInit(): void {
    this.setPatients()
    this.setPhysicians()
    console.log(this.data)
    this.appointmentUpdateForm = this.fb.group({
      patientId:[this.data.appointment.patient.patientId,[Validators.required]],
      physicianId:[this.data.appointment.physician.physicianId,[Validators.required]],
      startDateTime:[this.data.appointment.starDateTime,[Validators.required]],
      endDateTime:[this.data.appointment.endDateTime,[Validators.required]],
    })
  }
  updateAppointment() {
    this.spinner.show();

    let appointment:Appointment=this.appointmentUpdateForm.value
    appointment.appointmentId=this.data.appointment.appointmentId
    appointment.onCallId=this.data.appointment.prepNurse.onCallId
    // appointment.onCallId=this.data.oncallId
    // newTrainedId.physician=this.data.physicianId
    // newTrainedId.treatment=Number(this.onCallRegistrationForm.value.treatmentId)
    // console.log(appointment)
    this.appointmentPutApi.putAppointment(appointment).subscribe((data:ResponseMessage)=>{
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
