import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../app.animations';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()]

})
export class LoginComponent implements OnInit {
  public model: any;
  constructor(private af: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    debugger
    const email = form.value.email;
    const password = form.value.password;
    this.af.auth.signInWithEmailAndPassword(email, password).then(
      response => (
        this.router.navigate(['/users']))

    ).catch(
      error =>
        console.log("ERROR IN - " + error)
    );

    //    this.authService.login(email,password);

  }

}
