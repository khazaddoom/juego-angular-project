import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  subscription: Subscription;
  error = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSwitchModes() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(loginForm: NgForm) {
    //  console.log(loginForm.value)

    if (!loginForm.valid) {
      return;
    }

    const email = loginForm.value.email;
    const password = loginForm.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {

      this.isLoading = true;
      authObs = this.authService.login(email, password);
     
    } else {

      this.isLoading = true;
      authObs = this.authService.signUp(email, password);

    }

    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes']);
      },
      incomingError => {
        this.isLoading = false;
        this.error = incomingError;
      });

    loginForm.reset();

  }


}
