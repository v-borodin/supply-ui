import { Directive, Inject } from '@angular/core';
import { SUP_INPUT_ACCESSOR, SupInputAccessor } from '@supply/cdk';
import { SupInputComponent } from './input.component';

@Directive({
  selector: 'sup-input',
  providers: [
    {
      provide: SUP_INPUT_ACCESSOR,
      useExisting: SupInputDirective,
    },
  ],
})
export class SupInputDirective implements SupInputAccessor {
  readonly inputMode = 'text';

  get id(): string {
    return this.input.id;
  }

  get value(): string {
    return this.input.value;
  }

  get readOnly(): boolean {
    return this.input.readOnly || !this.input.editable;
  }

  get disabled(): boolean {
    return this.input.disabled;
  }

  get invalid(): boolean {
    return this.input.invalid;
  }

  focusable = this.input.focusable;

  constructor(
    @Inject(SupInputComponent)
    private readonly input: SupInputComponent,
  ) {}

  onValueChange(value: string): void {
    this.input.onValueChange(value);
  }
}
