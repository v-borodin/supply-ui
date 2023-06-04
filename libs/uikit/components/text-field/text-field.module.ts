import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { SupTextControlNative } from './text-control-native';
import { SupTextFieldComponent } from './text-field.component';
import { SupTextFieldDirective } from './text-field.directive';
import { SupInputModule } from '../input';
import { SupTextareaModule } from '../textarea';
import { SupDropdownModule } from '../dropdown';

@NgModule({
  declarations: [SupTextControlNative, SupTextFieldComponent, SupTextFieldDirective],
  imports: [SupInputModule, SupTextareaModule, NgIf, SupDropdownModule],
  exports: [SupTextControlNative, SupTextFieldComponent, SupTextFieldDirective],
})
export class SupTextFieldModule {}
