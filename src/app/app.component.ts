import { Component, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users: any[];
  loading: boolean = true;
  dataSource = new MatTableDataSource<any>();

  title = 'pagination';
d
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.http.get(`http://localhost:3000/users`).subscribe((response: any) =>{

    this.loading = false;
    this.users = response.users;
    this.dataSource = new MatTableDataSource<any>(this.users);
    this.dataSource.paginator = this.paginator;

    })
  }
}
