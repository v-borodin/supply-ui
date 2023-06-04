import { Directive, Inject } from '@angular/core';
import { SUP_INPUT_ACCESSOR } from '@supply/cdk';
import { SupDateInputComponent } from './date-input.component';
import { DateTime } from 'luxon';

@Directive({
  selector: 'sup-date-input',
  providers: [
    {
      provide: SUP_INPUT_ACCESSOR,
      useExisting: SupDateInputDirective,
    },
  ],
})
export class SupDateInputDirective {
  get id(): string {
    return this.dateInput.id;
  }

  get value(): string {
    return this.dateInput.computedValue;
  }

  get readOnly(): boolean {
    return true;
  }

  constructor(
    @Inject(SupDateInputComponent)
    private readonly dateInput: SupDateInputComponent,
  ) {}

  onValueChange(value: DateTime): void {
    this.dateInput.onValueChange(value);
  }
}
