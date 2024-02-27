import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {AppointmentApiService} from '../../../../../../service/appointment-api.service'
import { Appointment } from 'src/app/interface/appointment';
import {NurseAppointmentListComponent} from '../nurse-appointment-list/nurse-appointment-list.component'
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse-appointment-delete',
  templateUrl: './nurse-appointment-delete.component.html',
  styleUrls: ['./nurse-appointment-delete.component.css']
})
export class NurseAppointmentDeleteComponent {
  constructor(
    private dialogRef : MatDialogRef<NurseAppointmentListComponent>,
    private appointmentDeleteApi : AppointmentApiService,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}
  deleteAppointment(){
    this.spinner.show();

    let appointment:Appointment={appointmentId:0,patientId:0,physicianId:0,onCallId:0,startDateTime:'',endDateTime:''}
    appointment.appointmentId=this.data.appointment.appointmentId
    appointment.patientId=this.data.appointment.patient.patientId
    appointment.physicianId=this.data.appointment.physician.physicianId
    appointment.onCallId=this.data.appointment.prepNurse.onCallId
    appointment.startDateTime=this.data.appointment.starDateTime
    appointment.endDateTime=this.data.appointment.endDateTime
    this.appointmentDeleteApi.deleteAppointment(appointment).subscribe((data:ResponseMessage)=>{
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
