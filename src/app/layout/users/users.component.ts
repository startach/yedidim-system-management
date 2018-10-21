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

import * as XLSX from 'ts-xlsx';
import { AngularFireAuth } from 'angularfire2/auth';
import { BlockUI, NgBlockUI } from 'ng-block-ui';






@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  private loading: boolean = false;
  user: any;
  displayedColumns: string[] = ['FirstName', 'LastName', 'DriveCode', 'DispatcherCode', 'MobilePhone', 'Permissions', 'Settings'];
  usersArr: volunteer[];
  users = new MatTableDataSource<volunteer>(this.usersArr);
  arrayBuffer: any;
  file: File;
  isManager: boolean;
  dispatcher: any;
  xcelMandatoryColumns: Array<string>;
  logErrors: Array<string>;
  @BlockUI() blockUI: NgBlockUI;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private mockDataService: MockDataService, public dialog: MatDialog, private afd: AngularFireDatabase, private data: DataService, private af: AngularFireAuth) {
    this.blockUI.start('...אנא המתן בזמן שהמתנדבים מתאספים')
    if (sessionStorage.getItem('email')) {
      afd.list<any>('volunteer').valueChanges().subscribe(
        res => {
          this.usersArr = res; this.users.data = this.usersArr
          this.loading = false;
          this.blockUI.stop();
        }
      );
    }
  }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user)
    this.xcelMandatoryColumns = ['DriveCode', 'FirstName', 'LastName', 'IdentityNumber', 'MobilePhone']
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

    if (this.user && this.user.managerPermissions && this.user.managerPermissions.indexOf('עריכה') > -1)
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

  incomingfile(event) {
    debugger
    this.file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.onload = (e) => {

      this.blockUI.start('טוען מתנדבים מקובץ אקסל');
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var xlsxUsers = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      for (let i = 0; i < xlsxUsers.length; i++) {
        for (let j = 0; j < this.xcelMandatoryColumns.length; j++) {
          if (!xlsxUsers[i][this.xcelMandatoryColumns[j]]) {

            ///this.logErrors.push('line number ' + i + 'missing column' + '"' + this.xcelMandatoryColumns[j] + '"')
            console.log('line number ' + i + 'missing column' + '"' + this.xcelMandatoryColumns[j] + '"')
            continue;
          }
        }

        for (let index = 0; index < Object.keys(xlsxUsers[i]).length; index++) {

          if (typeof (xlsxUsers[i][Object.keys(xlsxUsers[i])[index]] != 'string')) {
            xlsxUsers[i][Object.keys(xlsxUsers[i])[index]] = String(xlsxUsers[i][Object.keys(xlsxUsers[i])[index]]);
          }
        }
        if (xlsxUsers[i]['DispatcherCode'] != '' && xlsxUsers[i]['DispatcherCode']) {
          let obj2 = { 'permissions': ["מוקדן"] }

          Object.assign(xlsxUsers[i], obj2);
        }


        this.af.auth.createUserWithEmailAndPassword('+972' + xlsxUsers[i]['MobilePhone'] + '@yedidim.org',
          xlsxUsers[i]['IdentityNumber']).then(value => {
            console.log('Success!', value);
          }, err => {
            console.log('Something went wrong in:', err.message);
          });

        this.afd.list('volunteer').set('+972' + xlsxUsers[i]['MobilePhone'], xlsxUsers[i]);
        if (xlsxUsers[i]['DispatcherCode'] != '' && xlsxUsers[i]['DispatcherCode']) {
          this.dispatcher = {
            NotificationStatus: '',
            NotificationStatusTimestamp: '',
            handleBot: '',
            name: xlsxUsers[i]['FirstName'] + ' ' + xlsxUsers[i]['LastName'],
            notifications: '',
            phone: xlsxUsers[i]['MobilePhone'],
            time: '',
            token: '',
            version: ''
          }


          this.afd.list('dispatchers').set(xlsxUsers[i]['DispatcherCode'], this.dispatcher);
        }
        // if (!this.logErrors || this.logErrors.length==0) {
        //   alert('Invalid values in /n'+this.logErrors)
        // }
      }
      this.blockUI.stop();
      
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  deleteUser(key): void {
    debugger
    if (key) {
      this.afd.list('volunteer').remove(key);
    }
    else {
      return
    }
  }
}
