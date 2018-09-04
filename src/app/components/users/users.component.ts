import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { MockDataService } from '../../shared/services/mock-data.service';
import { MatDialog } from '@angular/material';
import { UserDetailsComponent } from '../user-details/user-details.component'
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import {  volunteer} from '../../shared/models/volunteer';







@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public d: Function;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'driveCode','phone', 'address', 'city', 'emailAddres', 'yourVehicle', 'vehicleMake', 'licenseNumber', 'dateOfBirth', 'deviceType'];
  dataSource: Array<User>;
  public users:Array<volunteer>;
  
  constructor(private mockDataService: MockDataService, public dialog: MatDialog, afd: AngularFireDatabase) {
    this.dataSource = new Array<User>();

   afd.list<any>('volunteer').valueChanges().subscribe(
     res=>this.users=res
    );
    debugger
  }

  ngOnInit() {
    this.mockDataService.getUsers().subscribe(users => this.dataSource = users);
  }

  openDialog(row: any): void {

    let dialogRef = this.dialog.open(UserDetailsComponent, {
      height: '350px',
      width: '600px',
      data: Object.assign({}, row)

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed');

      }
    });

    this.d = function (row: any) {
      console.log(row);
    }


  }

}
