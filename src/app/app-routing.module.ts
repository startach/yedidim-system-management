import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./layout/users/users.component";
import { ManagersComponent } from "./layout/managers/managers.component";
import { LoginComponent } from "./login/login.component";
import { LayoutComponent } from './layout/layout.component'
const appRoutes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: 'main', component: LayoutComponent, children: [
      { path: '', redirectTo: '/main/users', pathMatch: 'full' },
      { path: "users", component: UsersComponent },
      { path: "managers", component: ManagersComponent }
    ]
  },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
