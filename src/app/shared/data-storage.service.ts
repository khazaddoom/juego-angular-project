import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.services';
import { Recipe } from '../recipes/recipe-list/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http.put('https://recipes-54f9d.firebaseio.com/recipes.json', recipes)
        .subscribe(response => console.log(response));
    }

    fetchRecipes() {
        
        return this.http.get<Recipe[]>('https://recipes-54f9d.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map( recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients? recipe.ingredients : []
                }
            });
        }), tap(recipes => this.recipeService.updateRecipes(recipes))
        );
       
    }

}