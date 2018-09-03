import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../app.animations';
import { AuthService } from '../../auth-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()]

})
export class LoginComponent implements OnInit {
  public model:any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm) {
    debugger
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email,password);

  }

}
