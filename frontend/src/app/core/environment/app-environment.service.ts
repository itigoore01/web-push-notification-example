import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mapTo, tap } from 'rxjs/operators';
import { createAppEnvironment, AppEnvironment } from './models/app-environment.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppEnvironmentService {

  private _environment$ = new BehaviorSubject<AppEnvironment | null>(null);

  readonly environmentChanges = this._environment$.asObservable();

  get environment() {
    return this._environment$.value;
  }

  constructor(
    private http: HttpClient,
  ) { }

  loadEnvironment() {
    return this.http.get('/api/environment')
      .pipe(
        map(createAppEnvironment),
        tap(env => this._environment$.next(env)),
        mapTo(void 0 as void),
      );
  }

}
