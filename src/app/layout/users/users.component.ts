import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../shared/models/user';
import { MockDataService } from '../../shared/services/mock-data.service';
import { MatDialog } from '@angular/material';
import { UserDetailsComponent } from '../user-details/user-details.component'
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { volunteer } from '../../shared/models/volunteer';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from '../../shared/services/data.service';







@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  user: any;
  displayedColumns: string[] = ['FirstName', 'LastName', 'DriveCode', 'DispatcherCode', 'MobilePhone', 'Permissions', 'Settings'];
  usersArr: volunteer[];
  users = new MatTableDataSource<volunteer>(this.usersArr);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private mockDataService: MockDataService, public dialog: MatDialog, public afd: AngularFireDatabase, private data: DataService) {

    afd.list<any>('volunteer').valueChanges().subscribe(
      res => { this.usersArr = res; this.users.data = this.usersArr }
    );
  }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user)

  }

  openDialog(row: any): void {
    if (!this.checkManagerPermissions())
      return;
    let dialogRef;
    if (row) {
      dialogRef = this.dialog.open(UserDetailsComponent, {
        data: Object.assign({}, row)
      });
    } else {
      dialogRef = this.dialog.open(UserDetailsComponent, {
        data: null
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed');

      }
    });
  }
  checkManagerPermissions() {
    
    if (this.user.managerPermissions &&this.user.managerPermissions.indexOf('עריכה')>-1)
      return true;
    return false;
  }
  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.users.sort = this.sort;
    this.users.paginator = this.paginator;

  }
  deleteUser(key): void {
    debugger
    this.afd.list('volunteer').remove(key);
  }
}
