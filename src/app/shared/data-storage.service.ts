import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.services';
import { Recipe } from '../recipes/recipe-list/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {

        const recipes: Recipe[] = this.recipeService.getRecipes();

        return this.http.put('https://recipes-54f9d.firebaseio.com/recipes.json', recipes);
       
    }

    fetchRecipes() {


        return this.http.get<Recipe[]>(
            'https://recipes-54f9d.firebaseio.com/recipes.json'
        ).pipe(map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                }
            });
        }), tap(recipes => this.recipeService.updateRecipes(recipes)));

    }
}