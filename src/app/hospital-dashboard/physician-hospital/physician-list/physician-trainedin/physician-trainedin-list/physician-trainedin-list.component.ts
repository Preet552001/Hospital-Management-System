import { Component, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrainedInApiService } from '../../../../../service/trainedin-api.service';
import { PhysicianListComponent } from '../../physician-list.component';
import {PhysicianTrainedinAddFormComponent} from '../physician-trainedin-add-form/physician-trainedin-add-form.component'
import {PhysicianTrainedinDeleteComponent} from '../physician-trainedin-delete/physician-trainedin-delete.component'
import {PhysicianTrainedinUpdateFormComponent} from '../physician-trainedin-update-form/physician-trainedin-update-form.component'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physician-trainedin-list',
  templateUrl: './physician-trainedin-list.component.html',
  styleUrls: ['./physician-trainedin-list.component.css']
})
export class PhysicianTrainedinListComponent {
  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<PhysicianListComponent>,
    private trainedInGetByPhysicianIdApi: TrainedInApiService,
    @Inject(MAT_DIALOG_DATA) public data,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['certificationDate', 'certificationExpires'];
  columnsToDisplay = ['treatmentName',...this.displayedColumns,'edit/delete', ];


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataOfTrainedin();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  dataOfTrainedin() {
    // console.log(this.data.physicianId)
    this.trainedInGetByPhysicianIdApi.getAllTrainedInOfPhysician(this.data.physicianId).subscribe((data:any) => {
      console.log(data)
      this.dataSource.data = data;
      this.spinner.hide();

    });
  }

  openDialogForAddTrainedin() {
    const dialogRef = this.dialog.open(PhysicianTrainedinAddFormComponent,{
      data:{physicianId:this.data.physicianId}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfTrainedin();
    });
  }
  openDialogForEditingTrainedin(trainedin) {
    const dialogRef = this.dialog.open(PhysicianTrainedinUpdateFormComponent, {
      data: { trainedinData: trainedin, physicianId:this.data.physicianId },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfTrainedin();
    });
  }

  openDialogForDeleteTrainedin(trainedin) {
    const dialogRef = this.dialog.open(PhysicianTrainedinDeleteComponent, {
      data: { trainedinData: trainedin, physicianId:this.data.physicianId },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfTrainedin();
    });
  }
}
