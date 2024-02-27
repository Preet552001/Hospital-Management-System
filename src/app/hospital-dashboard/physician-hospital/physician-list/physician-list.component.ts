import { Component, ViewChild } from '@angular/core';
import { PhysicianApiService } from '../../../service/physician-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PhysicianUpdateFormComponent } from '../physician-update-form/physician-update-form.component';
import { PhysicianDeleteComponent } from '../physician-delete/physician-delete.component';
import { Physician } from '../../../interface/physician';
import { PhysicianAddFormComponent } from '../physician-add-form/physician-add-form.component';
import {TotalNumberService} from '../../../service/total-number.service'
import {PhysicianTrainedinListComponent} from './physician-trainedin/physician-trainedin-list/physician-trainedin-list.component'
import {PhysicianAppointmentListComponent} from './physician-appointment/physician-appointment-list/physician-appointment-list.component'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-list',
  templateUrl: './physician-list.component.html',
  styleUrls: ['./physician-list.component.css'],
})
export class PhysicianListComponent {
  constructor(
    private physicianGetAllApi: PhysicianApiService,
    public dialog: MatDialog,
    private totalNumberPhysician:TotalNumberService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [ 'name', 'position'];
  columnsToDisplay = [...this.displayedColumns, 'trainedIn','appointment','edit/delete', ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataOfPhysician();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dataOfPhysician() {
    this.physicianGetAllApi.getAllPhysician().subscribe((data:any) => {
      this.totalNumberPhysician.numPhysician$.next(data.length)
      this.dataSource.data = data;
      this.spinner.hide();

    });
  }

  openDialogForAddPhysician() {
    const dialogRef = this.dialog.open(PhysicianAddFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfPhysician();
    });
  }
  openDialogForEditingPhysician(physician) {
    const dialogRef = this.dialog.open(PhysicianUpdateFormComponent, {
      data: { physicianData: physician },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfPhysician();
    });
  }

  openDialogForDeletePhysician(physician) {
    const dialogRef = this.dialog.open(PhysicianDeleteComponent, {
      data: { physicianData: physician },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfPhysician();
    });
  }

  openDialogForTrainedIn(physicianId) {
    const dialogRef = this.dialog.open(PhysicianTrainedinListComponent, {
      data: { physicianId: physicianId },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfPhysician();
    });
  }

  openDialogForAppointment(physicianId) {
    const dialogRef = this.dialog.open(PhysicianAppointmentListComponent, {
      data: { physicianId: physicianId },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfPhysician();
    });
  }
}
