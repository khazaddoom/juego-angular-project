import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  @Output() currentSelectedRecipe = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
     // service defines the data
     this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelected(recipe: Recipe) {

    // console.log(recipe);

    this.currentSelectedRecipe.emit(recipe);

  }

}
