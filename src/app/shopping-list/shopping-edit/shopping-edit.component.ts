import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ShoppingListService } from '../shoppinglist.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // Local references
  @ViewChild('ingredientName', { static: true}) ingredientName: ElementRef;
  @ViewChild('ingredientAmount', { static: true}) ingredientAmount: ElementRef;

  // // exposed to parent
  // @Output() currentIngredient =  new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient() {
    // this.currentIngredient.emit(
    //   new Ingredient(this.ingredientName.nativeElement.value, this.ingredientAmount.nativeElement.value)
    // );

    this.shoppingListService.addIngredientEvent(
      new Ingredient(this.ingredientName.nativeElement.value, this.ingredientAmount.nativeElement.value)
    );

  }

}
