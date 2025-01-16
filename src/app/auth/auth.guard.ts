import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1), //aqui eu so to pegando 1, isso evita se eu deslogar, logar e fazer tudo dnv
      map((user) => {
        const isAuth = !!user;

        if (isAuth) {
          return true;
        }

        return this.router.createUrlTree(['/auth']); //redirecionando para a tela de login
      })
    );
  }
}
