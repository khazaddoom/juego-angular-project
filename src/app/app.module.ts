import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Custom componets
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shoppinglist.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesHomeComponent } from './recipes/recipes-home/recipes-home.component';
import { RecipeNewComponent } from './recipes/recipe-new/recipe-new.component';
import { RecipeNeweditComponent } from './recipes/recipe-newedit/recipe-newedit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingEditComponent,
    DropdownDirective,
    PageNotFoundComponent,
    RecipesHomeComponent,
    RecipeNewComponent,
    RecipeNeweditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
