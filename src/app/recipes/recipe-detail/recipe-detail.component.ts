import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shoppinglist.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipeForDetail: Recipe;

  constructor(private shoppingListService: ShoppingListService) {  }

  ngOnInit() {
  }

  toShoppingList() {
   this.shoppingListService.updateShoppingList(this.recipeForDetail.ingredients);
  }


}
