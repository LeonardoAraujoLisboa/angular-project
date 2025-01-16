import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeDetail = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      this.recipeDetail.ingredients
    );
  }

  onDeleteRecipe() {
    this.recipeService.onDeleteRecipe(this.id);

    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
