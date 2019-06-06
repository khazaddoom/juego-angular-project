import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import { Recipe } from '../recipe-list/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe(
    'Chicken Curry',
    'An indian dish made from boiled chicken pieces.', 
    'https://recipesfromapantry.com/wp-content/uploads/2018/05/instant-pot-chicken-curry-11.jpg'
    )
  ];

  @Output() currentSelectedRecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {

    // console.log(recipe);

    this.currentSelectedRecipe.emit(recipe);

  }

}
