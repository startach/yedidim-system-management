import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../shared/moduls/app.animations';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router'
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../shared/services/data.service';
import { volunteer } from '../shared/models/volunteer';
import {BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()]

})
export class LoginComponent implements OnInit {
  public model: any;
  private loading:boolean=false;
  user:any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private af: AngularFireAuth, private router: Router, private afd: AngularFireDatabase,
    private data: DataService) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user)

  }

  onSubmit(form: NgForm) {
    debugger
    const phonePrefix='+972';
    const emailSignature= '@yedidim.org';
    const originalEmailValue=form.value.email;
    const email = phonePrefix + form.value.email.substr(1) + emailSignature; //For example +972527147236@yedidim.org
    const password = form.value.password;
    this.blockUI.start('...טוען');
    this.af.auth.signInWithEmailAndPassword(email, password).then(
      (response) => {
        sessionStorage.setItem('email',originalEmailValue);
        this.afd.list('volunteer', ref =>  ref.orderByChild('MobilePhone').equalTo(originalEmailValue||originalEmailValue.substr(1))).valueChanges().subscribe((data:volunteer[]) => {
          if(!data  || data.length==0)
          {
           this.blockUI.stop();
            alert("not authorized")
            return;
          }
          this.blockUI.stop();
          this.data.changeUser(data[0])

          if(data[0].permissions.indexOf('מנהל')>-1||data[0].permissions.indexOf('מנהל ראשי') > -1)
            this.router.navigate(['/main/users'])
        });;


      }


    ).catch(
      error =>{
        alert("ERROR IN - " + error)
        this.blockUI.stop();
      }
        
    );

    //    this.authService.login(email,password);

  }

}
