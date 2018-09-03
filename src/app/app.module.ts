import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { CustomMaterialModule } from './shared/moduls/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import {AppRoutingModule} from "../app/app-routing/app-routing.module";
import { ManagersComponent } from './components/managers/managers.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { FormsModule }   from '@angular/forms';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AuthService } from './auth-service';




@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ManagersComponent,
    LoginComponent,
    UserDetailsComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        FormsModule
  ],
  entryComponents: [
    UserDetailsComponent
],
  exports: [
  ],
  providers: [AuthService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
