import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Salt', 100), new Ingredient('Sage', 25)
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddNewingredient(newIngredient: Ingredient) {
    console.log(newIngredient);
    this.ingredients.push(newIngredient);
  }

}
