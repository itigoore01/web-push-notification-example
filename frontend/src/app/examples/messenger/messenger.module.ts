import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { MessengerFormComponent } from './messenger-form/messenger-form.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [MessengerFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [MessengerFormComponent],
})
export class MessengerModule { }
