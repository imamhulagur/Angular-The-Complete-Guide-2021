import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private RecipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }//injected RecipeService

  ngOnInit(): void {
    this.recipes = this.RecipeService.getRecipes(); //call getRecipe() and assign data to local recipes[]
  }
  onNewRecipe() {
      this.router.navigate(['new'], { relativeTo: this.route}); //since we are passing relative path, we need to inject activatedRoute
  }

}
