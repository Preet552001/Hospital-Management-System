import { Component, ViewChild } from '@angular/core';
import { PatientApiService } from '../../../service/patient-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PatientUpdateFormComponent } from '../patient-update-form/patient-update-form.component';
import { PatientDeleteComponent } from '../patient-delete/patient-delete.component';
import { Patient } from '../../../interface/patient';
import { PatientAddFormComponent } from '../patient-add-form/patient-add-form.component';
import {TotalNumberService} from '../../../service/total-number.service'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {
  constructor(
    private patientGetAllApi: PatientApiService,
    public dialog: MatDialog,
    private totalNumberPatient:TotalNumberService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [ 'name', 'address', 'phone'];
  columnsToDisplay = [...this.displayedColumns, 'edit/delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataOfPatient();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  dataOfPatient() {
    this.patientGetAllApi.getAllPatient().subscribe((data:any) => {
      this.totalNumberPatient.numPatient$.next(data.length)
      this.dataSource.data = data;
      this.spinner.hide();

    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialogForAddPatient() {
    const dialogRef = this.dialog.open(PatientAddFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfPatient();
    });
  }
  openDialogForEditingPatient(patient: Patient) {
    const dialogRef = this.dialog.open(PatientUpdateFormComponent, {
      data: { patientData: patient },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfPatient();
    });
  }

  openDialogForDeletePatient(patient: Patient) {
    const dialogRef = this.dialog.open(PatientDeleteComponent, {
      data: { patientData: patient },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfPatient();
    });
  }
}
