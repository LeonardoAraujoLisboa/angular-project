import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      authObs = this.authService.singup(form.value.email, form.value.password);
    }

    authObs.subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;

        this.router.navigate(['./recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
