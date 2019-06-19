import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { RecipeService } from './recipe.services';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService, private route: Router) { }

  ngOnInit() {

    this.recipeService.recipeSelectionEvent
    .subscribe(
      (selectedRecipe: Recipe) => this.selectedRecipe = selectedRecipe
    );   
  }

}
