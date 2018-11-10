import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: any;

  constructor(private data: DataService, private router: Router, private afd: AngularFireDatabase,private af: AngularFireAuth) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => {
    this.user = user
      if (!this.user.FirstName) {
        let email = sessionStorage.getItem('email');
        if (!email) {

          this.router.navigate(['/login'])
        }
        // else if(!this.af.auth.currentUser){
        //   this.router.navigate(['/login'])

        // }
        else {
          this.afd.list('volunteer', ref => ref.orderByChild('MobilePhone').equalTo(email)).valueChanges().subscribe(data => {
            this.data.changeUser(data[0])
          });;
        }
      }})
  }
}


