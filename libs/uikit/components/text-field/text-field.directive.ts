import { Directive, Inject } from '@angular/core';
import { SUP_INPUT_ACCESSOR, SupInputAccessor } from '@supply/cdk';
import { SupTextFieldComponent } from './text-field.component';

@Directive({
  selector: 'sup-text-field',
  providers: [
    {
      provide: SUP_INPUT_ACCESSOR,
      useExisting: SupTextFieldDirective,
    },
  ],
})
export class SupTextFieldDirective implements SupInputAccessor {
  readonly inputMode = 'text';

  get id(): string {
    return this.input.id;
  }

  get value(): string {
    return this.input.value;
  }

  get readOnly(): boolean {
    return this.input.readOnly;
  }

  get disabled(): boolean {
    return this.input.disabled;
  }

  get invalid(): boolean {
    return this.input.invalid;
  }

  constructor(
    @Inject(SupTextFieldComponent)
    private readonly input: SupTextFieldComponent,
  ) {}

  onValueChange(value: string): void {
    this.input.onValueChange(value);
  }
}
