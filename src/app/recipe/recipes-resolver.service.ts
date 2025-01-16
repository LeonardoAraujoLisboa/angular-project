import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/storage/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<Recipe[]> {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes(); //fiz isso pq quando dava o reload na aplicação em um
      //recipe a aplicação quebrava, e com isso ele vai buscar fazendo um resolve o problema
      //para o recipe q eu estou
      //eu tenho q coloca rla no routing, entao sempre q entrar na tela vai chamara isso
    } else {
      return recipes;
    }

    /*
      Tive que fazer essa condição pq quando eu altero um recipe e clico em salvar (sem ser o da api)
      ele retornava para a tela e saia logo em seguida as minhas alterações, isso pq quando eu salve
      ele volta para a tela que tem o resolve no app-routing que eu coloquei e ai ele tava chamando dnv o
      this.dataStorageService.fetchRecipes(); e como nao salvei na base ele busca o q estava antes
      fazendo assim sempre vai cair no else pq eu estou editando algo e ai as minhas alterações, mesmo que
      nao sejam salvas na base, irão aparecer
    */
  }
}
