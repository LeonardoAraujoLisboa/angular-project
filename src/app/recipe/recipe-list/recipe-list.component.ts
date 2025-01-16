import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router) {} //como eu adicionei no pai que é o recipe.compoenent,
  //nao precisa adicionar o providers aos filhos

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    ); //eu chamo aqui o recipesChanged para quando eu mudo ele la no serviço usando o next()
    //todos os componentes q tiverem o subscribe do recipesChanged vai ser chamados e
    //escutar as mudanças q foram feitas

    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['/recipe', 'new']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); //isso é so pra limpar o aplicativo e nao ter vazamento de memoria
  }
}
