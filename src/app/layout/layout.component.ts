import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: any;

  constructor(private data: DataService, private router: Router, private afd: AngularFireDatabase) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => {
    this.user = user
      if (!this.user.FirstName) {
        let email = sessionStorage.getItem('email');
        if (!email) {
          this.router.navigate(['/login'])
        }
        else {
          let a = this.afd.list('volunteer', ref => ref.orderByChild('EmailAddress').equalTo(email)).valueChanges().subscribe(data => {
            this.data.changeUser(data[0])
          });;
        }
      }})
  }
}


