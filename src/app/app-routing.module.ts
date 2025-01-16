import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipe/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipe',
    pathMatch: 'full', //se todo o caminho estiver vazio
  },
  {
    path: 'recipe',
    component: RecipeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
      }, //so coloquei isso pra ficar bonitinho
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        /*  resolve: [RecipesResolverService], deixei comentado pq a api nao esta funcionando*/
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        /*  resolve: [RecipesResolverService], deixei comentado pq a api nao esta funcionando*/
      },
    ], //as rotas que tem ':alguma coisa' sempre tem q vir por último
  },
  {
    path: 'shopping',
    component: ShoppingComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
