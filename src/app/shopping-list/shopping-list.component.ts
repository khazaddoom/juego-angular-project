import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private route: Router) { }

  ngOnInit() {

    this.ingredients = this.shoppingListService.getIngredients();

    this.subscription = this.shoppingListService.informAddIngredientEvent.subscribe(()=> {

      console.log(this.shoppingListService.getIngredients());
      this.ingredients = this.shoppingListService.getIngredients();
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // onAddNewingredient(newIngredient: Ingredient) {
  //   // console.log(newIngredient);
  //   this.ingredients.push(newIngredient);
  // }

}
