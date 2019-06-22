import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
    

    private ingredients: Ingredient[] = [
        new Ingredient('Salt', 100), new Ingredient('Sage', 25)
    ];
    // this event gets fired when there is an Ingredient getting added
    informAddIngredientEvent = new EventEmitter<Ingredient>();

    informAddIngredientEvent_new = new Subject<Ingredient[]>();

    informIngredientSelectedPromise = new Subject<number>();
    

    getIngredients() {
       return this.ingredients.slice();
    }

    addIngredientEvent(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.informAddIngredientEvent_new.next(this.ingredients.slice());
    }

   updateIngredientEvent(index: number, ingredient: Ingredient) {
       
    this.ingredients[index] = ingredient;
    this.informAddIngredientEvent_new.next(this.ingredients.slice());
    //console.log(this.ingredients)

    }

    deleteIngredient(index) {
        this.ingredients.splice(index, 1);
        this.informAddIngredientEvent_new.next(this.ingredients.slice());
    }

  
    updateShoppingList(updatedIngredients: Ingredient[]) {

        //this.ingredients = this.ingredients.splice(this.ingredients.length);        
        //Array.prototype.push.apply(this.ingredients, updatedIngredients);

        this.ingredients.push(...updatedIngredients);

        this.informAddIngredientEvent_new.next();
    }


}