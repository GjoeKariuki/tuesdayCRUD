import { Component, OnInit, ViewChild } from '@angular/core';
import {ApiService} from '../services/api.service';
import {DetailsFormComponent} from '../details-form/details-form.component';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';






@Component({
  selector: 'app-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.css']
})
export class DetailsListComponent implements OnInit {


  //declarations
  displayedColumns: string[] = ['admin_name','lat','lng','population','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  eqval: string[] = [];
  constructor( private dialog: MatDialog, private api:ApiService) { }

  ngOnInit(): void {
    this.getAllRecords();
    
  }

  getAllRecords(){
    this.api.getRecord().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.eqval = res;
        console.log(this.eqval);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editRecord(row:any){
    this.dialog.open(DetailsFormComponent, {
      width: '30%',
      data: row,
    }).afterClosed().subscribe(val => {
      if(val ==='update'){
        this.getAllRecords();
      }
    })
  }
  deleteRecord(id:number){
    
    //console.log(id);
    this.api.deleteRecord(id).subscribe({
      next: (res) => {
        alert("successfully deleted");
        this.getAllRecords();
      },
      error: (err) => {
        alert("error while deleting");
        console.log(err);
      }
    })
  }
  
  openDialog(){
    this.dialog.open(DetailsFormComponent, {
      width: '30%',}).afterClosed().subscribe(val => {
        if(val === 'save'){
         this.getAllRecords();
          //console.log("save pressed");
        }
      });
    }
    
    applyFilter(event: Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if(this.dataSource.paginator){
        this.dataSource.paginator.firstPage();
      }
    }
}
