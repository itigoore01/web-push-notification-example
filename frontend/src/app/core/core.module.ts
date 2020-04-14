import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChangeCaseInterceptor } from './interceptors/change-case.interceptor';
import { AppEnvironmentService } from './environment/app-environment.service';

export function environmentAppInitializer(appEnvironmentService: AppEnvironmentService) {
  return () => {
    appEnvironmentService.loadEnvironment().subscribe();
  };
}

@NgModule({})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: environmentAppInitializer,
          deps: [AppEnvironmentService],
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ChangeCaseInterceptor,
          multi: true,
        },
      ],
    };
  }

}
