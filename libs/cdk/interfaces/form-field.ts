import { NgControl } from '@angular/forms';

export interface SupFormFieldController {
  setFormControl(ngControl: NgControl): void;

  markAsTouched(): void;
}
