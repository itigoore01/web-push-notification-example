import { Injectable } from '@angular/core';
import { Reminder } from './models/reminder.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { mapTo, catchError } from 'rxjs/operators';
import { createAddReminderErrorResult, createAddReminderSuccessResult } from './models/add-reminder-result.model';
import { of, throwError } from 'rxjs';

function reminderToAddReminderRequest({ content, remindAt }: Reminder) {
  return {
    content,
    remindAt: remindAt.toISOString(),
  };
}

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(
    private http: HttpClient,
  ) { }

  addReminder(reminder: Reminder) {
    return this.http.post('/api/reminder', reminderToAddReminderRequest(reminder)).pipe(
      mapTo(createAddReminderSuccessResult({})),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return of(createAddReminderErrorResult({
            message: err.error?.message,
          }));
        }

        return throwError(err);
      }),
    );
  }

}
