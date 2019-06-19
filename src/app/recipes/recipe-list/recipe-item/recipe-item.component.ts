import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../recipe.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() recipeIndex: number;

  // @Output() fireRecipeSelectedEvent = new EventEmitter<void>();

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private routes: Router) { }

  ngOnInit() {
  }

  onRecipeSelect() {
    //this.fireRecipeSelectedEvent.emit();
    
    // I am no longer emiting an event local to this component but a Service event itself with the object selected
    this.recipeService.recipeSelectionEvent.emit(this.recipe);
    this.routes.navigate(['/recipes', this.recipeIndex], { relativeTo: this.route})
  }

}
