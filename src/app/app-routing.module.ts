import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';


const appRoutes: Route[] = [
    {
        path: '', redirectTo: '/recipes', pathMatch: 'full'
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
