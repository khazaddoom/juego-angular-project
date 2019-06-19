import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Route[] = [
    {
        path: '', component: AppComponent
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