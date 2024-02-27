import { Component, ViewChild } from '@angular/core';
import { NurseApiService } from '../../../service/nurse-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NurseUpdateFormComponent } from '../nurse-update-form/nurse-update-form.component';
import { NurseDeleteComponent } from '../nurse-delete/nurse-delete.component';
import { Nurse } from '../../../interface/nurse';
import { NurseAddFormComponent } from '../nurse-add-form/nurse-add-form.component';
import {TotalNumberService} from '../../../service/total-number.service'
import {NurseOncallCardComponent} from './nurse-oncall/nurse-oncall-card/nurse-oncall-card.component'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse-list',
  templateUrl: './nurse-list.component.html',
  styleUrls: ['./nurse-list.component.css'],
})
export class NurseListComponent {
  constructor(
    private nurseGetAllApi: NurseApiService,
    public dialog: MatDialog,
    private totalNumberNurse:TotalNumberService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [ 'name', 'position'];
  columnsToDisplay = [...this.displayedColumns,'oncall', 'edit/delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataOfNurse();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  dataOfNurse() {
    this.nurseGetAllApi.getAllNurse().subscribe((data:any) => {
      this.totalNumberNurse.numNurse$.next(data.length)
      this.dataSource.data = data;
      this.spinner.hide();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  openDialogForAddNurse() {
    const dialogRef = this.dialog.open(NurseAddFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfNurse();
    });
  }
  openDialogForEditingNurse(nurse: Nurse) {
    const dialogRef = this.dialog.open(NurseUpdateFormComponent, {
      data: { nurseData: nurse },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfNurse();
    });
  }

  openDialogForDeleteNurse(nurse: Nurse) {
    const dialogRef = this.dialog.open(NurseDeleteComponent, {
      data: { nurseData: nurse },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfNurse();
    });
  }

  openDialogForOncall(nurseId){
    const dialogRef = this.dialog.open(NurseOncallCardComponent, {
      data: { id: nurseId },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfNurse();
    });
  }
}
