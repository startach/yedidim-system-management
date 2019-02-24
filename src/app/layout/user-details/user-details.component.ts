import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { volunteer } from '../../shared/models/volunteer'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataService } from '../../shared/services/data.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AngularFireFunctions } from 'angularfire2/functions';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  registerForm: FormGroup;
  user: any;
  dispatcher: any;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private dataService: DataService, public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: volunteer, private afd: AngularFireDatabase,
    private formBuilder: FormBuilder, private auth: AngularFireAuth, @Inject(FirebaseApp) private firebaseApp: any,
    private fns: AngularFireFunctions) { }
  public permissions: string[];
  public managerPermissions: string[];
  public errorMessage: string;
  private currentUser: any;
  public originPhoneNumber: string;
  public originId: string;
  public originDispatcherCode: string;



  ngOnInit() {

    this.dataService.currentUser.subscribe(user => this.currentUser = user)
    this.permissions = ['מנהל ראשי', 'מנהל', 'מוקדן'];
    this.managerPermissions = ['צפיה', 'עריכה'];
    this.registerForm = this.formBuilder.group(
      {
        FirstName: ['חובה', Validators.required],
        LastName: ['', Validators.required],
        email: ['',],
        AnotherVehicle: ['',],
        Area: ['', Validators.required],
        City: ['',],
        DateOfBirth: ['',],
        DeviceType: ['',],
        DriveCode: ['', Validators.required],
        EmailAddress: ['',],
        Equipment: ['',],
        IdentityNumber: ['', Validators.required],
        LicenseNumber: ['',],
        MobilePhone: ['', Validators.required],
        StreetAddress: ['',],
        VehicleMake: ['',],
        YourVehicle: [''],
        permissions: [''],
        managerPermissions: ['',],
        DispatcherCode: ['',],
        handleBot: ['',]
      }
    );

    if (this.data) {
      this.user = this.data;
      if (!this.user.managerPermissions) {
        this.user.managerPermissions = '';
      }
      this.originPhoneNumber = this.user.MobilePhone;
      this.originId = this.user.IdentityNumber;
      this.originDispatcherCode = this.user.DispatcherCode;

    } else {
      this.user = {
        AnotherVehicle: ' ',
        Area: ' ',
        City: ' ',
        DateOfBirth: '',
        DeviceType: '',
        DriveCode: '',
        EmailAddress: '',
        Equipment: '',
        FirstName: '',
        IdentityNumber: '',
        LastName: '',
        LicenseNumber: '',
        MobilePhone: '',
        StreetAddress: '',
        VehicleMake: '',
        YourVehicle: '',
        permissions: [' '],
        managerPermissions: ' ',
        DispatcherCode: ' ',
        handleBot: ''
      }
    }
  }

  isDispatcher(): boolean {
    if (this.user.permissions && this.user.permissions.indexOf('מוקדן') > -1) {
      this.registerForm.controls['DispatcherCode'].setValidators([Validators.required]);
      this.registerForm.updateValueAndValidity();
      return true;
    }
    this.registerForm.controls['DispatcherCode'].clearValidators();
    this.registerForm.controls['DispatcherCode'].setValue(null);
    this.registerForm.controls['DispatcherCode'].updateValueAndValidity({ onlySelf: true, emitEvent: false });
    return false;
  }
  isPrimeManager(permission: string): boolean {
    if (this.currentUser.permissions.indexOf('מנהל ראשי') > -1)
      return false;
    else {
      if (permission === 'מנהל' || permission === 'מנהל ראשי')
        return true;
      else
        return false;
    }
  }
  isManager(): boolean {
    if (this.user.permissions) {
      if (this.user.permissions.indexOf('מנהל ראשי') > -1 ||
        this.user.permissions.indexOf('מנהל') > -1) {
        this.registerForm.controls['managerPermissions'].setValidators([Validators.required]);
        this.registerForm.updateValueAndValidity();
        return true;
      }
    }
    this.registerForm.controls['managerPermissions'].clearValidators();
    this.registerForm.controls['managerPermissions'].setValue(null);

    this.registerForm.controls['managerPermissions'].updateValueAndValidity({ onlySelf: true, emitEvent: false });
    return false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = '\r אנא מלא את השדות המסומנים';
      return;
    }
    else {
      try {
        this.blockUI.start('...טוען');

        for (let key in this.user) {
          if (!this.user[key]) {
            this.user[key] = '';

          }
        }
        this.isChangeRootData(this.user);
        if (this.user.DispatcherCode) {
          this.user.DispatcherCode = this.user.DispatcherCode.trim();
        }
        this.afd.list('volunteer', ref => ref.orderByChild('MobilePhone')
          .equalTo(this.user.MobilePhone))
          .valueChanges()
          .subscribe((data: volunteer[]) => {
            if (!data || data.length == 0) {
              this.createFirebaseUser('+972' + this.user.MobilePhone.substr(1) + '@yedidim.org', this.user.IdentityNumber);
            }
          });

        this.afd.list('volunteer').set('+972' + this.user.MobilePhone.substr(1), this.user);
        if (this.user.permissions) {
          if (this.user.permissions.indexOf('מוקדן') > -1) {
            this.dispatcher = {
              NotificationStatus: '',
              NotificationStatusTimestamp: '',
              handleBot: this.user.handleBot,
              name: this.user.FirstName + ' ' + this.user.LastName,
              notifications: '',
              phone: this.user.MobilePhone,
              time: '',
              token: '',
              version: ''
            }
            this.afd.list('dispatchers').set(this.user.DispatcherCode, this.dispatcher);
            this.createFirebaseUser(this.user.DispatcherCode + '@yedidim.org', this.user.MobilePhone);
          }
        }
        this.blockUI.stop();
        this.close();
      } catch (error) {
        this.blockUI.stop();
        console.log(error)
        this.close();
      }


    }
  }

  close(): void {
    this.dialogRef.close();
  }

  createFirebaseUser(email, password): void {
    this.auth.auth.createUserWithEmailAndPassword(email, password);

  }

  isChangeRootData(user: any) {
    var userNeedReset = false;
    if (this.originPhoneNumber && user.MobilePhone != this.originPhoneNumber) {
      this.afd.list('volunteer').remove('+972' + this.originPhoneNumber.toString().substr(1));
      userNeedReset = true
    }
    if (this.originId && user.IdentityNumber != this.originId) {
      userNeedReset = true
    }
    if (user.permissions.indexOf('מוקדן') > -1) {
      if (this.originDispatcherCode && user.DispatcherCode != this.originDispatcherCode) {
        this.afd.list('dispatchers').remove(this.originDispatcherCode.toString());
      }
    }

    const callable = this.fns.httpsCallable('deleteUser');
    callable({ email: 'pzm236@gmail.com' });
  }


}
