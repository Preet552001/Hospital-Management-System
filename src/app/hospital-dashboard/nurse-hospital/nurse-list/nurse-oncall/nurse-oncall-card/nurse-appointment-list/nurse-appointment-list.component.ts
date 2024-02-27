import { Component, Inject, ViewChild } from '@angular/core';
import { AppointmentApiService } from '../../../../../../service/appointment-api.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import {NurseOncallCardComponent} from '../../nurse-oncall-card/nurse-oncall-card.component'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {NurseAppointmentAddFormComponent} from '../nurse-appointment-add-form/nurse-appointment-add-form.component'
import {NurseAppointmentUpdateFromComponent} from '../nurse-appointment-update-from/nurse-appointment-update-from.component'
import {NurseAppointmentDeleteComponent} from '../nurse-appointment-delete/nurse-appointment-delete.component'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse-appointment-list',
  templateUrl: './nurse-appointment-list.component.html',
  styleUrls: ['./nurse-appointment-list.component.css']
})
export class NurseAppointmentListComponent {


  constructor(
    private appointmentGetByOncallApi: AppointmentApiService,
    public dialogRef: MatDialogRef<NurseOncallCardComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }

  
  dataSource = new MatTableDataSource();


  displayedColumns: string[] = ['starDateTime', 'endDateTime'];
  columnsToDisplay = ['patientName','physician',...this.displayedColumns,'edit/delete' ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    // console.log(this.data)
    this.getOnCallAppointment()
  }
  // oncallData
  getOnCallAppointment(){
    this.appointmentGetByOncallApi.getAppointmentByOncallId(this.data.oncallId).subscribe((val:any)=>{
      this.spinner.hide();

      console.log(val)
      // this.oncallData=data
      this.dataSource.data = val;
    })
  } 
  openDialogForAddAppointment() {
    const dialogRef = this.dialog.open(NurseAppointmentAddFormComponent,{
      data: { oncallId: this.data.oncallId },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getOnCallAppointment();
    });
  }
  openDialogForEditingAppointment(appointment) {
    const dialogRef = this.dialog.open(NurseAppointmentUpdateFromComponent,{
      data: { appointment: appointment },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getOnCallAppointment();
    });
  }
  openDialogForDeleteAppointment(appointment) {
    const dialogRef = this.dialog.open(NurseAppointmentDeleteComponent,{
      data: { appointment: appointment },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getOnCallAppointment();
    });
  }
}
