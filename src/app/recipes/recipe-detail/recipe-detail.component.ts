import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shoppinglist.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RecipeService } from '../recipe.services';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipeForDetail: Recipe;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private routes: Router, 
              private recipeService: RecipeService) 
    {}

  ngOnInit() {

   this.route.params.subscribe((params: Params) => {
     const id = +params['id'];
     this.recipeForDetail = this.recipeService.getRecipeById(id);
   });

  }

  toShoppingList() {
   this.shoppingListService.updateShoppingList(this.recipeForDetail.ingredients);
   this.routes.navigate(['/shopping-list'], {relativeTo: this.route});
  }


}
