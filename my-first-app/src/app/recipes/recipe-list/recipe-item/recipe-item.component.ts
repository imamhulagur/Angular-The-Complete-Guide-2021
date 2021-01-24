import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
//import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe : Recipe;
  @Input() index: number;
  //constructor(private recipeService: RecipeService) { }//inject service

  ngOnInit(): void {
  }

  // onSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe);//emit event from this component and pass the recipe to the service
  // }

}
