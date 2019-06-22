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

  selected = false;

  constructor(private shoppingListService: ShoppingListService, private route: Router) { }

  ngOnInit() {

    this.ingredients = this.shoppingListService.getIngredients();

    this.subscription = this.shoppingListService.informAddIngredientEvent_new.subscribe(()=> {
      this.ingredients = this.shoppingListService.getIngredients();
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelectIngredient(index: number) {
    this.selected = true;
    this.shoppingListService.informIngredientSelectedPromise.next(index);
  }

  // onAddNewingredient(newIngredient: Ingredient) {
  //   // console.log(newIngredient);
  //   this.ingredients.push(newIngredient);
  // }

}
