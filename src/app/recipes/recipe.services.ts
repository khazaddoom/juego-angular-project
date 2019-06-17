import { Recipe } from './recipe-list/recipe.model';

export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe(
        'Chicken Curry',
        'An indian dish made from boiled chicken pieces.', 
        'https://recipesfromapantry.com/wp-content/uploads/2018/05/instant-pot-chicken-curry-11.jpg'
        )
    ];


    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

}