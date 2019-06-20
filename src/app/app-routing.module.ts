import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesHomeComponent } from './recipes/recipes-home/recipes-home.component';
import { RecipeNewComponent } from './recipes/recipe-new/recipe-new.component';
import { RecipeNeweditComponent } from './recipes/recipe-newedit/recipe-newedit.component';

const appRoutes: Route[] = [
    {
        path: '', redirectTo: '/recipes', pathMatch: 'full'
    },
    {
        path: 'recipes', component: RecipesComponent, children: [
            {
                path: '', component: RecipesHomeComponent
            },
            {
                path: 'new', component: RecipeNeweditComponent
            },
            {
                path: ':id', component: RecipeDetailComponent
            },
            {
                path: ':id/edit', component: RecipeNeweditComponent
            }             
        ]
    },
    {
        path: 'shopping-list', component: ShoppingListComponent
    },
    
    {
        path: 'page-not-found', component: PageNotFoundComponent
    },
    {
        path: '**', redirectTo: '/page-not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}