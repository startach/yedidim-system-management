import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any;

  constructor(private data: DataService,private router: Router,private angularFire:AngularFireAuth) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user)
  }
  logout():void{
    sessionStorage.setItem('email','');
    this.router.navigate(['/login'])
  //  this.angularFire.auth.signOut().then(()=> this.router.navigate(['/login']))
  }
  openPage(pageName:string){
switch (pageName) {
  case 'volunteers':
    this.router.navigate(['main/users']);
    break;
    case 'dispatchers':
    this.router.navigate(['main/dispatchers']);
    break;
    case 'managers':
    this.router.navigate(['main/managers']);
    break;

  default:
    break;
}
  }

}
