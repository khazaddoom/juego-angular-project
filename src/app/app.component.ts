import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  featureSelected = 'recipe'; // originally i want to show Recipes

  onNavigation(navName: string) {

    console.log(navName);
    this.featureSelected = navName;
  }
}
