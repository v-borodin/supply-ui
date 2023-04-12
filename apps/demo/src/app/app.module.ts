import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  SupButtonComponent,
  SupInputComponent,
  SupLabelComponent,
  SupNotificationComponent,
  SupTextInputComponent,
} from '@supply/uikit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SupButtonComponent,
    SupInputComponent,
    SupTextInputComponent,
    SupLabelComponent,
    FormsModule,
    ReactiveFormsModule,
    SupNotificationComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
