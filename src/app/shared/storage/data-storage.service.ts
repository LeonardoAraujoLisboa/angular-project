import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../../recipe/recipe.service';
import { Recipe } from '../../recipe/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.post('url-da-api', recipes).subscribe(
      (responseData) => {
        console.log(responseData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('url-da-api?').pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        //o tap permite quer execute algum codigo sem alterar os dados
        //com isso tive q dar o return para pegar o subscribe la no componente
        this.recipeService.setRecipes(recipes);
      })
    );
    //ai eu quero dizer q so quero q ele traga um usuario
    //e dps cancela isso faz com que ele traga o usuario mais recente
    //o exhaustMap ele espera que o primeiro observável seja completo
  }
}
