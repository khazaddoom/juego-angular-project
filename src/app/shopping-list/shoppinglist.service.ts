import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {

    private ingredients: Ingredient[] = [
        new Ingredient('Salt', 100), new Ingredient('Sage', 25)
    ];
    // this event gets fired when there is an Ingredient getting added
    informAddIngredientEvent = new EventEmitter<Ingredient>();

    getIngredients() {
       return this.ingredients.slice();
    }

    addIngredientEvent(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.informAddIngredientEvent.emit();
    }


}