import { Recipe } from './recipe-list/recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe(
        'Mansaf',
        'Mansaf is a traditional Jordanian dish made of lamb cooked in a sauce of fermented dried yogurt and served with rice or bulgur.', 
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Traditional_Mansaf_served_on_flatbread.jpg/220px-Traditional_Mansaf_served_on_flatbread.jpg',
        [
            new Ingredient('Chicken pieces', 10), new Ingredient('GingerGarlic Paste', 5), new Ingredient('Yogurt', 1)
        ]
        ),
        new Recipe(
            'Chicken Curry',
            'An indian dish made from boiled chicken pieces.', 
            'https://recipesfromapantry.com/wp-content/uploads/2018/05/instant-pot-chicken-curry-11.jpg',
            [
                new Ingredient('Lamb', 5), new Ingredient('GingerGarlic Paste', 7), new Ingredient('Yogurt', 10)
            ]
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

    getRecipeById(id: number): Recipe {

        return this.recipes[id];
    }
}