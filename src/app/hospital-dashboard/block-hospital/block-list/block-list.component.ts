import { Component, ViewChild } from '@angular/core';
import { BlockApiService } from '../../../service/block-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BlockUpdateFormComponent } from '../block-update-form/block-update-form.component';
import { BlockDeleteComponent } from '../block-delete/block-delete.component';
import { Block } from '../../../interface/block';
import { BlockAddFormComponent } from '../block-add-form/block-add-form.component';
import {TotalNumberService} from '../../../service/total-number.service'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css']
})
export class BlockListComponent {
  constructor(
    private blockGetAllApi: BlockApiService,
    public dialog: MatDialog,
    private totalNumberBlock:TotalNumberService,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

  }

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [ 'blockFloor', 'blockCode'];
  columnsToDisplay = [...this.displayedColumns, 'edit/delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataOfBlock();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dataOfBlock() {
    this.blockGetAllApi.getAllBlock().subscribe((data:any) => {
      this.totalNumberBlock.numBlock$.next(data.length)
      this.dataSource.data = data;
      this.spinner.hide();
    });
  }

  openDialogForAddBlock() {
    const dialogRef = this.dialog.open(BlockAddFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfBlock();
    });
  }
  openDialogForEditingBlock(block: Block) {
    const dialogRef = this.dialog.open(BlockUpdateFormComponent, {
      data: { blockData: block },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfBlock();
    });
  }

  openDialogForDeleteBlock(block: Block) {
    const dialogRef = this.dialog.open(BlockDeleteComponent, {
      data: { blockData: block },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataOfBlock();
    });
  }
}
