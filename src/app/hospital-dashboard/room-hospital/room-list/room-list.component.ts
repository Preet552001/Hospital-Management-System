import { Component, ViewChild } from '@angular/core';
import { RoomApiService } from '../../../service/room-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RoomUpdateFormComponent } from '../room-update-form/room-update-form.component';
import { RoomDeleteComponent } from '../room-delete/room-delete.component';
import { Room } from '../../../interface/room';
import { RoomAddFormComponent } from '../room-add-form/room-add-form.component';
import {TotalNumberService} from '../../../service/total-number.service'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent {
  constructor(
    private roomGetAllApi: RoomApiService,
    public dialog: MatDialog,
    private totalNumberRoom:TotalNumberService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['roomNumber', 'roomType', 'availability'];
  columnsToDisplay = [...this.displayedColumns, 'block' ,'edit/delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataOfRoom();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  dataOfRoom() {
    this.roomGetAllApi.getAllRoom().subscribe((data) => {
      this.totalNumberRoom.numRoom$.next(data.length)
      this.dataSource.data = data;
      this.spinner.hide();

    });
  }

  openDialogForAddRoom() {
    const dialogRef = this.dialog.open(RoomAddFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfRoom();
    });
  }
  openDialogForEditingRoom(room: Room) {
    const dialogRef = this.dialog.open(RoomUpdateFormComponent, {
      data: { roomData: room },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfRoom();
    });
  }

  openDialogForDeleteRoom(room: Room) {
    const dialogRef = this.dialog.open(RoomDeleteComponent, {
      data: { roomData: room },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfRoom();
    });
  }
}
