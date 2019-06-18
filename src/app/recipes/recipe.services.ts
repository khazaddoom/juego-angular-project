import { Recipe } from './recipe-list/recipe.model';
import { EventEmitter, SimpleChanges } from '@angular/core';

export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe(
        'Chicken Curry',
        'An indian dish made from boiled chicken pieces.', 
        'https://recipesfromapantry.com/wp-content/uploads/2018/05/instant-pot-chicken-curry-11.jpg'
        )
    ];

    // this member/property always has the so as to say 'selected recipe'
    recipeSelectionEvent = new EventEmitter<Recipe>();

    // ngOnChange(change: SimpleChanges)
    ngDoCheck() {
        console.log('something happened!!!')
    }


    getRecipes(): Recipe[] {

        // slice is used to return a copy which is isolated from the actual class member!
        return this.recipes.slice();
    }
}