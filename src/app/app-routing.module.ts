import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';


const appRoutes: Route[] = [
    {
        path: '', redirectTo: '/recipes', pathMatch: 'full'
    },
    // {
    //     path: 'auth', loadChildren: './auth/auth.module#AuthModule'
    // },
    // {
    //     path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'
    // },
    // {
    //     path: 'shopping-list', loadChildren: './recipes/recipes.module#RecipesModule'
    // },
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
