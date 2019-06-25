import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService) {}

  // featureSelected = 'recipe'; // originally i want to show Recipes

  // onNavigation(navName: string) {

  //   // console.log(navName);
  //   this.featureSelected = navName;
  // }
  /** commenting this code as the page showing happens now using routes. */

  ngOnInit() {
    this.authService.autoLogin();
  }

}
