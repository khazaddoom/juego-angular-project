import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipesHomeComponent } from './recipes-home/recipes-home.component';
import { RecipeNeweditComponent } from './recipe-newedit/recipe-newedit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResolverService } from './recipes-resolver.service';

const recipeFeatureRoutes: Route[] = [
    {
        path: '', component: RecipesComponent, canActivate: [AuthGuard],
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
];


@NgModule({
    imports: [
        RouterModule.forChild(recipeFeatureRoutes), 
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule {}