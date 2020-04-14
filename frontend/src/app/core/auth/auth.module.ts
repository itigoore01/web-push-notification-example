import { NgModule, ModuleWithProviders, APP_INITIALIZER, ApplicationRef, Injector } from '@angular/core';
import { first, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export function authAppInitializer(injector: Injector, authService: AuthService) {
  return () => {
    const appRef = injector.get(ApplicationRef);
    return appRef.isStable.pipe(
      first(stable => stable),
      switchMap(() => authService.checkSession()),
    )
    .toPromise()
    .catch(err => console.error('Check session failed with:', err));
  };
}

@NgModule({})
export class AuthModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: authAppInitializer,
          deps: [Injector, AuthService],
          multi: true,
        }
      ],
    };
  }

}
