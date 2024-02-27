import { Component, Inject, ViewChild } from '@angular/core';
import { PhysicianApiService } from '../../../../../service/physician-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PhysicianListComponent } from '../../physician-list.component';
import {PhysicianAppointmentPrescribedCardComponent} from '../physician-appointment-prescribed/physician-appointment-prescribed-card/physician-appointment-prescribed-card.component'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-appointment-list',
  templateUrl: './physician-appointment-list.component.html',
  styleUrls: ['./physician-appointment-list.component.css']
})
export class PhysicianAppointmentListComponent {

  constructor(
    private physicianGetApi: PhysicianApiService,
    public dialog: MatDialog,
    private dialogRef : MatDialogRef<PhysicianListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['starDateTime', 'endDateTime'];
  columnsToDisplay = ['patientName',...this.displayedColumns,'prescribed', ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataOfPhysicianAppointment();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  dataOfPhysicianAppointment() {
    this.physicianGetApi.getPhysician(this.data.physicianId).subscribe((data:any) => {
      this.dataSource.data = data.appointments;
      this.spinner.hide();

    });
  }

  openDialogForPrescribed(appointment) {
    const dialogRef = this.dialog.open(PhysicianAppointmentPrescribedCardComponent, {
      data: { appointment: appointment, physicianId : this.data.physicianId },
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
