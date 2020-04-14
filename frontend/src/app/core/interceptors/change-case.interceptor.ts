import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function deepChangeProperties(obj: unknown, changeFn: (propertyName: string) => string): unknown {
  if (Array.isArray(obj)) {
    return obj.map(v => deepChangeProperties(v, changeFn));
  }
  if (typeof obj === 'object' && obj != null) {
    const result: { [key: string]: unknown } = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = (obj as any)[key];
        result[changeFn(key)] = deepChangeProperties(element, changeFn);
      }
    }
    return result;
  }

  return obj;
}

function camelToSnake(str: string): string {
  return str.replace(/([A-Z]+)/g, (_, p1) => `_${p1.toLowerCase()}`);
}

function snakeToCamel(str: string): string {
  return str.replace(/[_]([a-z])/g, (_, p1) => p1.toUpperCase());
}

@Injectable()
export class ChangeCaseInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      body: deepChangeProperties(request.body, camelToSnake),
    });

    return next.handle(request).pipe(
      map(event => {
        if (event.type === HttpEventType.Response && request.responseType === 'json') {
          return event.clone({
            body: deepChangeProperties(event.body, snakeToCamel),
          });
        }
        return event;
      }),
    );
  }
}
