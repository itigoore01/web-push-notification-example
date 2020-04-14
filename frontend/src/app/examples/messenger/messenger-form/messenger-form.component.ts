import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessengerService } from 'src/app/core/messenger/messenger.service';
import { TypeSafeFormBuilder } from 'ngx-type-safe-reactive-form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators } from '@angular/forms';
import { createMessage } from 'src/app/core/messenger/models/message.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-messenger-form',
  templateUrl: './messenger-form.component.html',
  styleUrls: ['./messenger-form.component.scss']
})
export class MessengerFormComponent {

  readonly loading$ = new BehaviorSubject(false);

  readonly form = this.formBuilder.group({
    to: ['', [Validators.required, Validators.email]],
    body: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: TypeSafeFormBuilder,
    private messengerService: MessengerService,
    private snackBar: MatSnackBar,
  ) { }

  onSend() {
    if (this.loading$.value) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.setLoading(true);
    this.form.disable();
    this.snackBar.open('メッセージを送信しています');

    this.messengerService.sendMessage(createMessage(this.form.value))
      .pipe(
        finalize(() => this.setLoading(false))
      )
      .subscribe(result => {
        if (result.success) {
          this.snackBar.open('メッセージを送信しました');
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
