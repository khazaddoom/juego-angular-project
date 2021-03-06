import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {

    this.recipes = this.recipeService.getRecipes();
     // service defines the data
     this.recipeService.recipesChangedEvent.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
     })
  }

}
