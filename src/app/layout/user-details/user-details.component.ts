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
  constructor(public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private afd: AngularFireDatabase,
    private formBuilder: FormBuilder) { }
  private permissions: string[];
  private managerPermissions: string[];
  

  ngOnInit() {
    this.permissions = ['מנהל', 'כונן', 'מוקדן'];
    this.managerPermissions=['צפיה','עריכה'];
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
        managerPermissions: ['',]
      }
    );
    if (this.data) {
      this.user = this.data;
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
        managerPermissions:''
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    debugger
    if (this.registerForm.invalid) {
      return;
    }
    this.afd.list('volunteer').set(this.user.MobilePhone, this.user);
  }

}
