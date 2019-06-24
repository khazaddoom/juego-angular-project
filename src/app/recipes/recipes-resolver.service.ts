import { Injectable } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.services';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private dsService: DataStorageService, private recipeService: RecipeService) {}
    
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
      
      if (this.recipeService.getRecipes().length === 0) {
          return this.dsService.fetchRecipes();
      }
      
      return this.recipeService.getRecipes();
    
    }

}