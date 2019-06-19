import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService, private route: Router) { }

  ngOnInit() {

    this.ingredients = this.shoppingListService.getIngredients();

    this.shoppingListService.informAddIngredientEvent.subscribe(()=> {

      console.log(this.shoppingListService.getIngredients());
      this.ingredients = this.shoppingListService.getIngredients();
    });

  }

  // onAddNewingredient(newIngredient: Ingredient) {
  //   // console.log(newIngredient);
  //   this.ingredients.push(newIngredient);
  // }

}
