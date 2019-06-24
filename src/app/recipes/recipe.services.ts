import { Recipe } from './recipe-list/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class RecipeService {

    private recipes: Recipe[] = [];

    // this member/property always has the so as to say 'selected recipe'
    //updated now with a subject implementation as it is a recommended approach!
    recipeSelectionEvent = new Subject<Recipe>();

    recipesChangedEvent = new Subject<Recipe[]>();

    // ngOnChange(change: SimpleChanges)
    ngDoCheck() {
        //console.log('something happened!!!')
    }


    getRecipes(): Recipe[] {

        // slice is used to return a copy which is isolated from the actual class member!
        if (this.recipes.length > 0) {
            return this.recipes.slice();
        } else return [];
        
    }

    getRecipeById(id: number): Recipe {

        return this.recipes[id];
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChangedEvent.next(this.recipes.slice());
    }

   addRecipe(newRecipe: Recipe) {
        
        this.recipes.push(newRecipe);
        this.recipesChangedEvent.next(this.recipes.slice());

        console.log(this.recipes)
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChangedEvent.next(this.recipes.slice());
    }

    updateRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChangedEvent.next(this.recipes.slice())
    }


}