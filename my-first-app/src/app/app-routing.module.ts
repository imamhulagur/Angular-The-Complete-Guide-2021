import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";



const appRoutes: Routes = [
    {
        path:'', redirectTo: '/recipes', 
        pathMatch: 'full'
    },
    {
        path: 'recipes', component: RecipesComponent,
        children: [
            {
                path: '', component: RecipeStartComponent // /recipes/
            },
            {
                path: 'new', component: RecipeEditComponent // /recipe/new
            },
            {
                path: ':id', component: RecipeDetailsComponent
            },
            {
                path: ':id/edit', component: RecipeEditComponent // /recipes/1/edit
            }
        ]
    },
    {
        path: 'shopping-list', component: ShoppingListComponent
    }
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],

    exports:[
        RouterModule
    ]
})

export class AppRoutingModule {}