import { Component, Inject, ViewChild } from '@angular/core';
import { OncallApiService } from '../../../../../service/oncall-api.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NurseListComponent } from '../../../nurse-list/nurse-list.component';
import {NurseOncallAddFormComponent} from '../nurse-oncall-add-form/nurse-oncall-add-form.component'
import {NurseOncallDeleteComponent} from '../nurse-oncall-delete/nurse-oncall-delete.component'
import {NurseOncallUpdateFormComponent} from '../nurse-oncall-update-form/nurse-oncall-update-form.component'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {NurseAppointmentListComponent} from './nurse-appointment-list/nurse-appointment-list.component'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse-oncall-card',
  templateUrl: './nurse-oncall-card.component.html',
  styleUrls: ['./nurse-oncall-card.component.css']
})
export class NurseOncallCardComponent {

  constructor(
    private nurseOncallGetApi: OncallApiService,
    public dialogRef: MatDialogRef<NurseListComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['onCallStart', 'onCallEnd'];
  columnsToDisplay = ['blockCode','blockFloor',...this.displayedColumns, 'appointment','edit/delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log(this.data)
    this.getOnCallFromNurseId()
  }
  // oncallData
  getOnCallFromNurseId(){
    this.nurseOncallGetApi.getOncallByNurseId(this.data.id).subscribe((data:any)=>{
      console.log(data)
      // this.oncallData=data
      this.dataSource.data = data;
      this.spinner.hide();

    })
  } 
  
  openDialogForAddOnCall() {
    const dialogRef = this.dialog.open(NurseOncallAddFormComponent,{
      data: { nurseId: this.data.id },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getOnCallFromNurseId();
    });
  }
  openDialogForEditingOnCall(oncallData) {
    const dialogRef = this.dialog.open(NurseOncallUpdateFormComponent, {
      data: { oncallData: oncallData },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getOnCallFromNurseId();
    });
  }

  openDialogForDeleteOnCall(oncallData) {
    const dialogRef = this.dialog.open(NurseOncallDeleteComponent, {
      data: { oncallData: oncallData },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getOnCallFromNurseId();
    });
  }

  openDialogForAppointment(oncallData) {
    const dialogRef = this.dialog.open(NurseAppointmentListComponent, {
      data: { oncallId: oncallData },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getOnCallFromNurseId();
    });
  }

}
