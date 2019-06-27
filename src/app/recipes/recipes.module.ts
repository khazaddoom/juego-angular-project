import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipesHomeComponent } from './recipes-home/recipes-home.component';
import { RecipeNeweditComponent } from './recipe-newedit/recipe-newedit.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { DropdownDirective } from '../shared/dropdown.directive';


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipesHomeComponent,
        RecipeNeweditComponent,
        DropdownDirective,
    ],
    imports: [
        RouterModule, CommonModule, ReactiveFormsModule, RecipesRoutingModule
    ],
    providers: [DropdownDirective]
})
export class RecipesModule {}