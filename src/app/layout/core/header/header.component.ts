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
   this.angularFire.auth.signOut().then(()=> this.router.navigate(['/login'])
   )
  }

}
