import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";


@Injectable()
export class RecipeService implements OnInit {
    recipeSelected = new EventEmitter<Recipe>();
    //making this private, so that no one can access it from outside directly
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe', 
            'This is simply a test', 
            'https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg?fit=1200%2C879&ssl=1',
                [
                    new Ingredient('Meat', 1),
                    new Ingredient('French',20)
                ]
            ),
        new Recipe(
            'Another Test Recipe', 
            'This is simply a test', 
            'https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg?fit=1200%2C879&ssl=1',
                [
                    new Ingredient('Buns', 2),
                    new Ingredient('Meat',1)
                ]
            )
      ];
    constructor(private slService: ShoppingListService){}

    //instead of accessing this service directly,then need to call using this method
    getRecipes() {
        return this.recipes.slice();//slice() return copy of recipe array, so that we cant get access to the real recipe array directly.
    }
    
    getRecipe(index: number) {
        return this.recipes[index];
    }
    ngOnInit(){

    }

    addIngredientsTogShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}