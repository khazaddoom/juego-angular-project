import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from '../shoppinglist.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // // exposed to parent
  // @Output() currentIngredient =  new EventEmitter<Ingredient>()

  @ViewChild('shopppingListForm', {static: true}) shopppingListForm: NgForm;

  subscription: Subscription;

  selectedIngredient: Ingredient;

  editMode = false;
  selectedIngredientIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {

    this.subscription = this.shoppingListService.informIngredientSelectedPromise.subscribe((index: number) => {

      this.editMode = true;
      this.selectedIngredientIndex = index;
      this.selectedIngredient = this.shoppingListService.getIngredients()[index];

      this.shopppingListForm.setValue({
        name: this.selectedIngredient.name,
        amount: this.selectedIngredient.amount
      });

    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmitIngredient(form: NgForm) {

    if (this.editMode) {
      this.editMode = false;

      this.shoppingListService.updateIngredientEvent(this.selectedIngredientIndex,
        new Ingredient(form.value.name, form.value.amount)
      );
      
    } else {
     
      this.shoppingListService.addIngredientEvent(new Ingredient(form.value.name, form.value.amount)
      );
    }
   
    form.reset();

  }

  onClearForm(form: NgForm) {
    form.reset();
    this.editMode = false;
  }


  onDeleteItem() {
    this.editMode = false;
    this.shopppingListForm.reset();
    this.shoppingListService.deleteIngredient(this.selectedIngredientIndex);
  }

}
