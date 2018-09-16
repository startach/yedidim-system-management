import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AngularFireDatabase } from 'angularfire2/database';
import { volunteer } from '../../shared/models/volunteer'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  registerForm: FormGroup;
  user: any;
  dispatcher:any;
  constructor(public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private afd: AngularFireDatabase,
    private formBuilder: FormBuilder) { }
  private permissions: string[];
  private managerPermissions: string[];


  ngOnInit() {
    this.permissions = ['מנהל', 'מוקדן'];
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
        permissions: ['', Validators.required],
        managerPermissions: ['',],
        DispatcherCode: ['',]
      }
    );

    if (this.data) {
      this.user = this.data;
      if (!this.user.managerPermissions) {
        this.user.managerPermissions = '';
      }

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
        permissions: '',
        managerPermissions: ' ',
        DispatcherCode:' '
      }
    }
  }

  isDispatcher(): boolean {
    if (this.user.permissions && this.user.permissions.indexOf('מוקדן') > -1) {
      this.registerForm.controls['DispatcherCode'].setValidators([Validators.required]);
      this.registerForm.updateValueAndValidity();
      return true;
    }
    return false;
  }

  isManager(): boolean {
    if (this.user.permissions && this.user.permissions.indexOf('מנהל') > -1) {
      this.registerForm.controls['managerPermissions'].setValidators([Validators.required]);
      this.registerForm.updateValueAndValidity();
      return true;
    }
    return false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    debugger
    if (this.registerForm.invalid) {
      return;
    }
    this.afd.list('volunteer').set('+972'+this.user.MobilePhone.substr(1), this.user);
    if (this.user.permissions.indexOf('מוקדן') > -1) {
      this.dispatcher={
        NotificationStatus:'',
        NotificationStatusTimestamp:'',
        handleBot:'',
        name:this.user.FirstName+this.user.LastName,
        notifications:'',
        phone:this.user.MobilePhone,
        time:'',
        token:'',
        version:''
      }
       this.afd.list('dispatchers').set(this.user.DispatcherCode, this.dispatcher);
    }
  }

}
