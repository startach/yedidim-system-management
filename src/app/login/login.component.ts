import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../shared/moduls/app.animations';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router'
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../shared/services/data.service';
import { volunteer } from '../shared/models/volunteer';
import {BlockUI, NgBlockUI } from 'ng-block-ui'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()]

})
export class LoginComponent implements OnInit {
  public model: any;
  user:any;
  @BlockUI() blockUi: NgBlockUI
  constructor(private af: AngularFireAuth, private router: Router, private afd: AngularFireDatabase,
    private data: DataService) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user)

  }

  onSubmit(form: NgForm) {
    debugger
    const email = form.value.email;
    const password = form.value.password;
    this.blockUi.start('Loading...');
    this.af.auth.signInWithEmailAndPassword(email, password).then(
      (response) => {
        sessionStorage.setItem('email',email);
        this.afd.list('volunteer', ref =>  ref.orderByChild('EmailAddress').equalTo(email)).valueChanges().subscribe((data:volunteer[]) => {
          if(!data  || data.length==0)
          {
            this.blockUi.stop();
            alert("not authorized")
            return;
          }
          this.blockUi.stop();
          this.data.changeUser(data[0])

          if(data[0].permissions.indexOf('מנהל')>-1)
            this.router.navigate(['/main/users'])
        });;


      }


    ).catch(
      error =>
        alert("ERROR IN - " + error)
    );

    //    this.authService.login(email,password);

  }

}
