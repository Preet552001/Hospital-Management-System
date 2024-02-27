import { Component, ViewChild } from '@angular/core';
import { TreatmentApiService } from '../../../service/treatment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import{TreatmentUpdateFormComponent} from '../treatment-update-form/treatment-update-form.component'
import{TreatmentAddFormComponent} from '../treatment-add-form/treatment-add-form.component'
import {TreatmentDeleteComponent} from '../treatment-delete/treatment-delete.component'
import { Treatment } from '../../../interface/treatment';
import {TotalNumberService} from '../../../service/total-number.service'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css'],
})
export class TreatmentListComponent {
  constructor(
    private treatmentGetAllApi: TreatmentApiService,
    public dialog: MatDialog,
    private totalNumberTreatment:TotalNumberService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }

  
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [ 'name', 'cost'];
  columnsToDisplay = [...this.displayedColumns, 'edit/delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataOfTreatment();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  dataOfTreatment() {
    this.treatmentGetAllApi.getAllTreatment().subscribe((data:any) => {
      this.totalNumberTreatment.numTreatment$.next(data.length)
      this.dataSource.data = data;
      this.spinner.hide();

    });
  }

  openDialogForAddTreatment() {
    const dialogRef = this.dialog.open(TreatmentAddFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfTreatment();
    });
  }

  openDialogForEditingTreatment(treatment: Treatment) {
    const dialogRef = this.dialog.open(TreatmentUpdateFormComponent, {
      data: { treatmentData: treatment },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfTreatment();
    });
  }

  openDialogForDeleteTreatment(treatment: Treatment) {
    const dialogRef = this.dialog.open(TreatmentDeleteComponent, {
      data: { treatmentData: treatment },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfTreatment();
    });
  }
}
