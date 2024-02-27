import { Component, Inject } from '@angular/core';
import { PrescribedApiService } from '../../../../../../service/prescribed-api.service';
import { Prescribed } from '../../../../../../interface/prescribed';
import { MatDialogRef } from "@angular/material/dialog";
import { PhysicianAppointmentPrescribedCardComponent } from '../physician-appointment-prescribed-card/physician-appointment-prescribed-card.component';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import {ResponseMessage} from '../../../../../../interface/responseMessage'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-appointment-prescribed-delete',
  templateUrl: './physician-appointment-prescribed-delete.component.html',
  styleUrls: ['./physician-appointment-prescribed-delete.component.css']
})
export class PhysicianAppointmentPrescribedDeleteComponent {
  constructor(
    private dialogRef : MatDialogRef<PhysicianAppointmentPrescribedCardComponent>,
    private prescribedDeleteApi: PrescribedApiService,    
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) {}

  deletePrescribed() {
    this.spinner.show();

    let prescribed:Prescribed={id:0,physician:0,patient:0,medication:0,date:'',appointment:0,dose:''}
    prescribed.appointment=this.data.appointmentId
    prescribed.patient=this.data.prescription.patientId
    prescribed.physician=this.data.prescription.physician.physicianId
    prescribed.id=this.data.prescription.prescribedId
    prescribed.date=this.data.prescription.createdOn
    prescribed.dose=this.data.prescription.dose
    prescribed.medication=this.data.prescription.medication.medicationId
    this.prescribedDeleteApi.deletePrescribed(prescribed).subscribe((data:ResponseMessage)=>{
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
