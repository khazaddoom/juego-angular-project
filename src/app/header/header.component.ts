import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;
  subscription : Subscription;
  isAuthenticated = false;

  
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {

    this.subscription = this.authService.user.subscribe( user => {
      
        this.isAuthenticated = !user? false : true
    
    });
  }

  onSaveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
