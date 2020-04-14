import { Component } from '@angular/core';
import { TypeSafeFormBuilder } from 'ngx-type-safe-reactive-form';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { createLoginParams } from 'src/app/core/auth/models/login-params.model';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  readonly loading$ = new BehaviorSubject(false);

  readonly form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  readonly submitDisabled$ = this.loading$.asObservable();

  constructor(
    private formBuilder: TypeSafeFormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  onLogin() {
    if (this.loading$.value) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.setLoading(true);
    this.snackBar.open('ログインしています');

    this.authService.login(createLoginParams(this.form.value))
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(result => {
        if (result.success) {
          this.snackBar.open('ログインしました');
          this.router.navigate(['/']);
        } else {
          this.snackBar.open(result.message);
        }
      });
  }

  private setLoading(loading: boolean) {
    this.loading$.next(loading);

    if (loading) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

}
