import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  SupButtonComponent,
  SupIconComponent,
  SupLabelComponent,
  SupNotificationComponent,
} from '@supply/uikit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SupButtonComponent,
    SupLabelComponent,
    FormsModule,
    ReactiveFormsModule,
    SupNotificationComponent,
    SupIconComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
