import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shoppinglist.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RecipeService } from '../recipe.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipeForDetail: Recipe;
  subscription: Subscription;
  currentRecipeId: number;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private routes: Router, 
              private recipeService: RecipeService) 
    {}

  ngOnInit() {

    this.subscription = this.route.params.subscribe((params: Params) => {
     const id = +params['id'];
     this.currentRecipeId = id;
     this.recipeForDetail = this.recipeService.getRecipeById(id);
   });

  }

  toShoppingList() {
   this.shoppingListService.updateShoppingList(this.recipeForDetail.ingredients);
   this.routes.navigate(['/shopping-list'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete() {

    console.log(this.currentRecipeId)

    this.recipeService.deleteRecipe(this.currentRecipeId);
    this.routes.navigate(['/recipes'], {relativeTo: this.route});

  }


}
