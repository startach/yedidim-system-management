import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UsersComponent } from './layout/users/users.component';
import { CustomMaterialModule } from './shared/moduls/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { ManagersComponent } from './layout/managers/managers.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './layout/user-details/user-details.component';
import { AuthService } from './shared/services/auth-service';
import { DataService } from './shared/services/data.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { HeaderComponent } from './layout/core/header/header.component';
import { LayoutComponent } from './layout/layout.component'
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatDatepickerModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ManagersComponent,
    LoginComponent,
    UserDetailsComponent,
    HeaderComponent,
    LayoutComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [
    UserDetailsComponent
  ],
  exports: [
  ],
  providers: [AngularFireAuth, MatDatepickerModule,DataService],

  bootstrap: [AppComponent]
})
export class AppModule { }
