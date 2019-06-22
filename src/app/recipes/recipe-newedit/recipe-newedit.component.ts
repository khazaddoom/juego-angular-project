import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.services';

@Component({
  selector: 'app-recipe-newedit',
  templateUrl: './recipe-newedit.component.html',
  styleUrls: ['./recipe-newedit.component.css']
})
export class RecipeNeweditComponent implements OnInit {

  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(private currentRoute: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {

    this.currentRoute.params.subscribe((params: Params)=> {
      this.id = +params['id'];      
      this.editMode = (params['id'] !== undefined)? true : false;
      this.initForm();
     });

  }

  private initForm() {

    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {

      const recipe =  this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients.length != 0) {
        recipe.ingredients.forEach(element => {
          recipeIngredients.push(new FormGroup({
            'name' : new FormControl(element.name),
            'amount': new FormControl(element.amount)
          }));
        });
      }
      
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imgPath': new FormControl(recipeImgPath),
      'description': new FormControl(recipeDescription),
      'ingredients' : recipeIngredients
    });

  }

  onSubmit() {

  }
}
