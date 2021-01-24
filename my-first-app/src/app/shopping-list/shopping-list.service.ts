import { Injectable } from "@angular/core";
import { EventEmitter, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService implements OnInit {
    ingredientChanged = new EventEmitter<Ingredient[]>();
    private ingredients : Ingredient[] =  [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];
    
    ngOnInit() {
        
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // for(let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);//ES6 feature spread operator simple make our ingredients array to list of individual arrays
        this.ingredientChanged.emit(this.ingredients.slice());
    }
}