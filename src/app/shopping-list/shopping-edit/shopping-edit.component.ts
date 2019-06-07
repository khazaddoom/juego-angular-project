import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('ingredientName', { static: true}) ingredientName: ElementRef;
  @ViewChild('ingredientAmount', { static: true}) ingredientAmount: ElementRef;

  @Output() currentIngredient =  new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddIngredient() {
    this.currentIngredient.emit(
      new Ingredient(this.ingredientName.nativeElement.value, this.ingredientAmount.nativeElement.value)
    );
  }

}
