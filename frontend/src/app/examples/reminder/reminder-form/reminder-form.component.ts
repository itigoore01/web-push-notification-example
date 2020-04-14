import { Component } from '@angular/core';
import { TypeSafeFormBuilder } from 'ngx-type-safe-reactive-form';
import { Validators } from '@angular/forms';
import { ReminderService } from 'src/app/core/reminder/reminder.service';
import { createReminder } from 'src/app/core/reminder/models/reminder.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent {

  readonly loading$ = new BehaviorSubject(false);

  readonly form = this.formBuilder.group({
    content: ['', Validators.required],
    inSeconds: [10, Validators.required],
  });

  constructor(
    private formBuilder: TypeSafeFormBuilder,
    private reminderService: ReminderService,
    private snackBar: MatSnackBar,
  ) { }

  onPost() {
    if (this.loading$.value) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { content, inSeconds } = this.form.value;

    const remindAt = new Date();
    remindAt.setSeconds(remindAt.getSeconds() + inSeconds);

    const reminder = createReminder({ content, remindAt, });

    this.setLoading(true);
    this.form.disable();
    this.snackBar.open('リマインダーを登録しています');

    this.reminderService.addReminder(reminder)
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(result => {
        if (result.success) {
          this.snackBar.open('リマインダーを登録しました');
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
