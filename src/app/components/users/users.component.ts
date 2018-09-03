import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user';
import {MockDataService} from '../../shared/services/mock-data.service';
import { MatDialog } from '@angular/material';
import {UserDetailsComponent} from '../user-details/user-details.component'





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
public d:Function;

    displayedColumns: string[] = ['id', 'fname','lname','conanNum','mokdanNum','phoneNumber','permissions'];
    dataSource:Array<User>;
  
  constructor(private mockDataService:MockDataService,public dialog:MatDialog) { 
    this.dataSource=new Array<User>();
  }

  ngOnInit() {
     this.mockDataService.getUsers().subscribe(users => 
      this.dataSource = users
    );
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
    
   this.d = function(row :any) {
      console.log(row);
    }

    
  }

}
