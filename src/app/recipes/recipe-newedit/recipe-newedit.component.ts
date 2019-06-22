import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.services';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-newedit',
  templateUrl: './recipe-newedit.component.html',
  styleUrls: ['./recipe-newedit.component.css']
})
export class RecipeNeweditComponent implements OnInit {

  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(private currentRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router ) { }

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
            'name' : new FormControl(element.name, Validators.required),
            'amount': new FormControl(
              element.amount, [
                Validators.required,
                // this.positiveIntegerValidation
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]
              )
          }));
        });
      }
      
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imgPath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    });

  }

  onSubmit() {

    

    let ingredients: Ingredient[] = [];
    this.recipeForm.get('ingredients').value.forEach(element => {
      ingredients.push(element);
    });

    let newRecipe = {
      name: this.recipeForm.get('name').value,
      description: this.recipeForm.get('description').value,
      imagePath: this.recipeForm.get('imgPath').value,
      ingredients: ingredients
    };

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.router.navigate(['../'], {relativeTo: this.currentRoute});
   

  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name' : new FormControl(null, Validators.required),
            'amount': new FormControl(null, [
              Validators.required,
              // this.positiveIntegerValidation
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
    }));
  }

  positiveIntegerValidation(control: FormControl) : {[s: string] : boolean} {

    if (control.value <= 0) {
      return { 'invalid_amount' : true};
    } else {
      return null;
    }
   
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.currentRoute});
  }

}
