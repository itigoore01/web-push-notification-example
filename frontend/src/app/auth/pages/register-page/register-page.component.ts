import { Component } from '@angular/core';
import { TypeSafeFormBuilder } from 'ngx-type-safe-reactive-form';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { createRegisterParams } from 'src/app/core/auth/models/register-params.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  readonly loading$ = new BehaviorSubject(false);

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordConfirmation: ['', [Validators.required]],
  });

  readonly submitDisabled$ = this.loading$.asObservable();

  constructor(
    private formBuilder: TypeSafeFormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  onRegister() {
    if (this.loading$.value) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.setLoading(true);
    this.snackBar.open('アカウントを作成しています');

    this.authService.register(createRegisterParams(this.form.value))
      .pipe(
        finalize(() => this.setLoading(false))
      ).subscribe(result => {
        if (result.success) {
          this.snackBar.open('アカウントを作成しました');
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
