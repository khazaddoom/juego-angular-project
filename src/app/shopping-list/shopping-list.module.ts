import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list.routing.mdoule';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [BrowserModule, CommonModule, FormsModule, ShoppingListRoutingModule],
    providers: [],
    exports: []
})
export class ShoppingListModue {}