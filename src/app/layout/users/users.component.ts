import { AfterViewInit, Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { User } from '../../shared/models/user';
import { MockDataService } from '../../shared/services/mock-data.service';
import { MatDialog } from '@angular/material';
import { UserDetailsComponent } from '../user-details/user-details.component'
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { volunteer } from '../../shared/models/volunteer';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from '../../shared/services/data.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component'

import * as XLSX from 'ts-xlsx';
import { AngularFireAuth } from 'angularfire2/auth';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SelectionModel } from '@angular/cdk/collections';
import * as moment from "moment";






@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild('myDialog') myDialog: TemplateRef<any>;
  private loading: boolean = false;
  user: any;
  displayedColumns: string[] = ['select','index', 'FirstName', 'LastName', 'DriveCode', 'DispatcherCode', 'MobilePhone', 'LastSeen', 'Permissions'];
  usersArr: volunteer[];
  users = new MatTableDataSource<volunteer>(this.usersArr);
  arrayBuffer: any;
  file: File;
  isManager: boolean;
  dispatcher: any;
  xcelMandatoryColumns: Array<string>;
  logErrors: Array<string>;
  public xlsxUsers: any;
  selection = new SelectionModel<volunteer>(true, []);

  @BlockUI() blockUI: NgBlockUI;



  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private mockDataService: MockDataService, public dialog: MatDialog, private afd: AngularFireDatabase, private data: DataService, private af: AngularFireAuth) {
    this.blockUI.start('...אנא המתן')
    if (sessionStorage.getItem('email')) {
      afd.list<any>('volunteer').valueChanges().subscribe(
        res => {
          this.usersArr = res;
          this.users.data = this.usersArr
          this.blockUI.stop();
        }
      );
    }
  }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user)
    this.xcelMandatoryColumns = ['DriveCode', 'FirstName', 'LastName', 'IdentityNumber', 'MobilePhone']
  }
  uploadFile() {
    document.getElementById('fileToUpload').click()
  }

  openDialog(row: any): void {
    if (!this.checkManagerPermissions())
      return;
    let dialogRef;
    if (row) {
      dialogRef = this.dialog.open(UserDetailsComponent, {
        data: Object.assign({}, row)
      });
      this.selection.clear();
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
    this.file = event.target.files[0];

    let fileReader = new FileReader();
    this.blockUI.start('טוען מתנדבים מקובץ אקסל');

    fileReader.onload = (e) => {

      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.xlsxUsers = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      for (let i = 0; i < this.xlsxUsers.length; i++) {
        for (let j = 0; j < this.xcelMandatoryColumns.length; j++) {
          if (!this.xlsxUsers[i][this.xcelMandatoryColumns[j]]) {

            this.logErrors.push('line number ' + i + 1 + 'missing column' + '"' + this.xcelMandatoryColumns[j] + '"')
            console.log('line number ' + i + 'missing column' + '"' + this.xcelMandatoryColumns[j] + '"')
            continue;
          }
        }

        for (let index = 0; index < Object.keys(this.xlsxUsers[i]).length; index++) {

          if (typeof (this.xlsxUsers[i][Object.keys(this.xlsxUsers[i])[index]] != 'string')) {
            this.xlsxUsers[i][Object.keys(this.xlsxUsers[i])[index]] = String(this.xlsxUsers[i][Object.keys(this.xlsxUsers[i])[index]]);
          }
        }
        if (this.xlsxUsers[i]['DispatcherCode'] != '' && this.xlsxUsers[i]['DispatcherCode']) {
          let obj2 = { 'permissions': ["מוקדן"] }

          Object.assign(this.xlsxUsers[i], obj2);
        }


        this.xlsxUsers[i]['MobilePhone'] = '0' + this.xlsxUsers[i]['MobilePhone'];
        this.af.auth.createUserWithEmailAndPassword('+972' + this.xlsxUsers[i]['MobilePhone'].substr(1) + '@yedidim.org',
          this.xlsxUsers[i]['IdentityNumber']).then(value => {
            //console.log('Success!', value);
          }, err => {
            //console.log('Something went wrong in:', err.message);
          });
        this.afd.list('volunteer').set('+972' + this.xlsxUsers[i]['MobilePhone'].substr(1), this.xlsxUsers[i]);
        if (this.xlsxUsers[i]['DispatcherCode'] != '' && this.xlsxUsers[i]['DispatcherCode']) {
          this.dispatcher = {
            NotificationStatus: '',
            NotificationStatusTimestamp: '',
            handleBot: 'false',
            name: this.xlsxUsers[i]['FirstName'] + ' ' + this.xlsxUsers[i]['LastName'],
            notifications: '',
            phone: this.xlsxUsers[i]['MobilePhone'],
            time: '',
            token: '',
            version: ''
          }


          this.afd.list('dispatchers').set(this.xlsxUsers[i]['DispatcherCode'], this.dispatcher);
          this.af.auth.createUserWithEmailAndPassword(this.xlsxUsers[i]['DispatcherCode'] + '@yedidim.org', this.xlsxUsers[i]['MobilePhone'])

        }

      }
      if (this.logErrors) {
        alert('Invalid values in: \n  ' + this.logErrors.map(err => err + '\n'))
      }
      else {
        this.dialog.open(this.myDialog);
      }


      this.blockUI.stop();

    }
    fileReader.readAsArrayBuffer(this.file);
  }

  deleteUser(user): void {
    debugger
    if (user.MobilePhone) {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: false
      });
      dialogRef.componentInstance.confirmMessage = "האם אתה בטוח שאתה רוצה למחוק את " +
        user.FirstName.bold() + " " + user.LastName.bold() + "?";
      dialogRef.afterClosed().subscribe(result => {
        if (result) {

          let key = '+972' + user.MobilePhone.substr(1);
          this.afd.list('volunteer').remove(key);
          this.selection.clear()

          alert(user.FirstName + " " + user.LastName + " נמחק בהצלחה!")
        }
        dialogRef = null;
      });
    }
    else {
      alert("!לא התבצעה מחיקה, בדוק את תקינות הפעולה")
    }
  }
  deleteMultiUsers(users) {
    if (users.length == 1) {
      this.deleteUser(users[0])
      return;
    }
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = "האם אתה בטוח שאתה רוצה למחוק " + users.length + " משתמשים?";
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (users.length > 0) {
          for (let index = 0; index < users.length; index++) {
            this.afd.list('volunteer').remove('+972' + users[index].MobilePhone);

            if (users[index].DispatcherCode) {
              this.afd.list('dispatchers').remove(users[index].DispatcherCode);
            }
          }
          this.selection.clear()

        }
      }
      dialogRef = null;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.filteredData.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.users.filteredData.forEach(row => this.selection.select(row));
  }
  getPageSizeOptions(): number[] {
    return [50, 100, 200, this.users.data.length];
  }
}
