import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  //@Input() recipe: Recipe;
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //const id = this.route.snapshot.params['id']; here need to act for changes, bcz while right side displaying currently views recipe details, if he click on other we need to display other details .
    //so we need subscribe
    this.route.params
      .subscribe(
        (params: Params) => {
          //now we need to react to new id
          this.id = +params['id'];//the value we get here string, so wee need to parse it to number by adding +
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsTogShoppingList(this.recipe.ingredients);
  }
  
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route})
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route});
    //this way is just to know we can even do the complex navigation
  }

}
