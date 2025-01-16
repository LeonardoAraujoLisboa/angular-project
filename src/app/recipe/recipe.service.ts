import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping/shopping-list/shopping-list-edit/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'A Teste Recepi',
      'This is simply a test',
      'https://www.eatingwell.com/thmb/yMc-omrZge4WvdofEtjNWSVHG10=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Chicken-piccata-casserole-3x2-167-f44730f489cc4b9493547de1c76a3b93.jpg',
      [new Ingredients('Meat', 1), new Ingredients('French Fries', 20)]
    ),
    new Recipe(
      2,
      'A Teste Recepi 2',
      'This is simply a test 2',
      'https://www.eatingwell.com/thmb/yMc-omrZge4WvdofEtjNWSVHG10=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Chicken-piccata-casserole-3x2-167-f44730f489cc4b9493547de1c76a3b93.jpg',
      [new Ingredients('Buns', 2), new Ingredients('Meat', 1)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  recipeSelected = new Subject<Recipe>();

  getRecipes() {
    return this.recipes.slice(); //vou acessar uma cópia
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(id: number) {
    const recipe = this.recipes.find((s) => {
      return s.id === id;
    });

    return recipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    this.shoppingListService.onAddIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    const newId =
      this.recipes.length > 0
        ? Math.max(...this.recipes.map((r) => r.id)) + 1
        : 1;
    const newRecipe = { ...recipe, id: newId };

    this.recipes.push(newRecipe);

    this.recipesChanged.next(this.recipes.slice());
  }

  onUpdatedRecipe(id: number, recipe: Recipe) {
    this.recipes.find((s) => {
      if (s.id === id) {
        s.name = recipe.name;
        s.description = recipe.description;
        s.imagePath = recipe.imagePath;
        s.ingredients = recipe.ingredients;
      }
    });

    this.recipesChanged.next(this.recipes.slice());
  }

  onDeleteRecipe(id: number) {
    this.recipes = this.recipes.filter((s) => s.id !== id);
    this.recipesChanged.next(this.recipes.slice());
  }
}
