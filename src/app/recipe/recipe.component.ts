import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipeSelected: Recipe;
  private recipeSub: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeSub = this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.recipeSelected = recipe;
      }
    );
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }
}
