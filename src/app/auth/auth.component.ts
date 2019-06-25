import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

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
  
  constructor(private authService: AuthService) { }

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

    if (this.isLoginMode) {
      // ...
    } else {

      this.isLoading = true;

      this.authService.signUp(email, password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          this.error = null;
        },
        error => {
          this.isLoading = false;
          this.error = error;
        });

    }

    loginForm.reset();

  }


}
