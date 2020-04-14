import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { mapTo, catchError, tap, map } from 'rxjs/operators';

import { LoginParams } from './models/login-params.model';
import { LoginResult, createLoginSuccessResult, createLoginErrorResult } from './models/login-result.model';
import { RegisterResult, createRegisterSuccessResult, createRegisterErrorResult } from './models/register-result.model';
import { RegisterParams } from './models/register-params.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = new BehaviorSubject(false);

  get authenticated(): boolean {
    return this._isAuthenticated.value;
  }

  readonly authenticatedChanges = this._isAuthenticated.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  login(params: LoginParams): Observable<LoginResult> {
    return this.http.post('/api/login', params).pipe(
      mapTo(createLoginSuccessResult({})),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return of(createLoginErrorResult({
            message: err.error?.message,
          }));
        }

        return throwError(err);
      }),
      tap(result => this._isAuthenticated.next(result.success)),
    );
  }

  register(params: RegisterParams): Observable<RegisterResult> {
    return this.http.post('/api/register', params).pipe(
      mapTo(createRegisterSuccessResult({})),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return of(createRegisterErrorResult({
            message: err.error?.message,
          }));
        }

        return throwError(err);
      }),
      tap(result => this._isAuthenticated.next(result.success)),
    );
  }

  logout() {
    return this.http.post<void>('/api/logout', null);
  }

  /**
   * @returns trueの場合はセッションが有効、それ以外はセッションが無効です。
   */
  checkSession(): Observable<boolean> {
    return this.http.get('/api/ping').pipe(
      mapTo(true),
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return of(false);
        }

        return throwError(err);
      }),
      tap(val => this._isAuthenticated.next(val)),
    );
  }

}
