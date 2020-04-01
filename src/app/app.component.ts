import { Component, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpParams } from '@angular/common/http';


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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getData('0', '5');
  }

  getData(offset, limit){
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);

    this.http.get('http://localhost:3000/users?' + params.toString())
    .subscribe((response: any) =>{

      this.loading = false;
      this.users = response.users;
      this.users.length = response.total;

      this.dataSource = new MatTableDataSource<any>(this.users);
      this.dataSource.paginator = this.paginator;

    })
  }

  getNextData(currentSize, offset, limit){
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);

    this.http.get('http://localhost:3000/users?' + params.toString())
    .subscribe((response: any) =>{

      this.loading = false;

      this.users.length = currentSize;
      this.users.push(...response.users);

      this.users.length = response.total;

      this.dataSource = new MatTableDataSource<any>(this.users);
      this.dataSource._updateChangeSubscription();

      this.dataSource.paginator = this.paginator;
  
    })
  }

  pageChanged(event){
    this.loading = true;

    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    let previousIndex = event.previousPageIndex;

    let previousSize = pageSize * pageIndex;

    this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
  }
}
