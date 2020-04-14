import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { ReminderFormComponent } from './reminder-form/reminder-form.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ReminderFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [ReminderFormComponent]
})
export class ReminderModule { }
