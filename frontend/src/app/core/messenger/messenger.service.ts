import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Message } from './models/message.model';
import { mapTo, catchError } from 'rxjs/operators';
import { createSendMessageSuccessResult, createSendMessageErrorResult } from './models/send-message-result.model';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(
    private http: HttpClient,
  ) { }

  sendMessage(message: Message) {
    return this.http.post('/api/messages', message).pipe(
      mapTo(createSendMessageSuccessResult({})),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return of(createSendMessageErrorResult({
            message: err.error?.message,
          }));
        }

        return throwError(err);
      }),
    );
  }

}
