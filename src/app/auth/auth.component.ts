import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { AlertmodalDirective } from '../shared/alertmodal.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  subscription: Subscription;
  error = null;
  
  @ViewChild(AlertmodalDirective, {static:false}) alertHost: AlertmodalDirective;

  constructor(private authService: AuthService, private router: Router, private compfac: ComponentFactoryResolver) { }

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

        // this is making the Alert Modal available somewhere in the AuthComponent!
        this.showErrorModal(incomingError);

        this.isLoading = false;
        this.error = incomingError;
      });

    loginForm.reset();

  }

  onCloseAlert() {
    this.error = null;
  }

  showErrorModal(message: string) {

    // prepare the factory object!
    const alertCompFactory = this.compfac.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    
    // clear all contents before begin the rendering!
    hostViewContainerRef.clear();

    const compRef = hostViewContainerRef.createComponent(alertCompFactory);

    // pass the property value so the rendered component shows the data that it is created to show!
    compRef.instance.message = message;

    this.subscription = compRef.instance.close.subscribe(() => {
      this.subscription.unsubscribe();
      hostViewContainerRef.clear();
    });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
