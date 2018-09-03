import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "../components/users/users.component";
import { ManagersComponent } from "../components/managers/managers.component";
import { LoginComponent } from "../components/login/login.component";

const appRoutes: Routes = [
  {    path: "",    redirectTo: "/login",    pathMatch: "full"  },
  {    path: "users",    component: UsersComponent  },
  {    path: "managers",     component: ManagersComponent },
  {    path: "login",     component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
