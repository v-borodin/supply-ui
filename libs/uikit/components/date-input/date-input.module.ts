import { NgModule } from '@angular/core';
import { SupDateInputComponent } from './date-input.component';
import { NgIf } from '@angular/common';
import { SupDateInputDirective } from './date-input.directive';
import { SupInputModule } from '@supply/uikit/components/input';
import { SupCalendarModule } from '@supply/uikit/components/calendar';
import { SupDropdownModule } from '@supply/uikit/components/dropdown';

@NgModule({
  declarations: [SupDateInputDirective, SupDateInputComponent],
  imports: [NgIf, SupInputModule, SupCalendarModule, SupDropdownModule],
  exports: [SupDateInputDirective, SupDateInputComponent],
})
export class SupDateInputModule {}
