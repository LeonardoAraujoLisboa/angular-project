import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipeDetail: Recipe;
  recipeForm: FormGroup;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.recipeDetail = this.recipeService.getRecipe(this.id);
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.onUpdatedRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancelEdit() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const ingredients = new FormArray([]);

    if (this.editMode) {
      recipeName = this.recipeDetail.name;
      recipeImagePath = this.recipeDetail.imagePath;
      recipeDescription = this.recipeDetail.description;
      if (this.recipeDetail.ingredients) {
        for (let ingredient of this.recipeDetail.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: ingredients,
    });
  }

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
    //(this.recipeForm.get('ingredients') as FormArray).clear();//esse dai remove todos
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
}
