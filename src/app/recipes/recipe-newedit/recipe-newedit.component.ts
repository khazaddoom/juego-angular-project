import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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

    console.log(this.recipeForm)

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

}
