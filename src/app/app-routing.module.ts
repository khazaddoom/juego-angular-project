import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesHomeComponent } from './recipes/recipes-home/recipes-home.component';
import { RecipeNeweditComponent } from './recipes/recipe-newedit/recipe-newedit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Route[] = [
    {
        path: '', redirectTo: '/recipes', pathMatch: 'full'
    },
    {
        path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],
        children: [
            {
                path: '', component: RecipesHomeComponent
            },
            {
                path: 'new', component: RecipeNeweditComponent
            },
            {
                path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]
            },
            {
                path: ':id/edit', component: RecipeNeweditComponent,  resolve: [RecipesResolverService]
            }             
        ]
    },
    {
        path: 'shopping-list', component: ShoppingListComponent
    },

    {
        path: 'auth', component: AuthComponent
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

// , children: [
//     {
//         path: ':id/edit', component: ShoppingListComponent
//     } ]