import { Directive, Inject, InjectionToken, Type } from '@angular/core';
import { SUP_INPUT_ACCESSOR, SupInputAccessor } from '@supply/cdk';
import { SupTextareaComponent } from './textarea.component';

export const SUP_TEXTAREA = new InjectionToken<Type<SupTextareaDirective>>('');

@Directive({
  selector: 'sup-textarea',
  providers: [
    {
      provide: SUP_INPUT_ACCESSOR,
      useExisting: SupTextareaDirective,
    },
    {
      provide: SUP_TEXTAREA,
      useExisting: SupTextareaDirective,
    },
  ],
})
export class SupTextareaDirective implements SupInputAccessor {
  readonly inputMode = 'text';

  get id(): string {
    return this.textarea.id;
  }

  get value(): string {
    return this.textarea.value;
  }

  get readOnly(): boolean {
    return this.textarea.readOnly;
  }

  get disabled(): boolean {
    return this.textarea.disabled;
  }

  get invalid(): boolean {
    return this.textarea.invalid;
  }

  constructor(
    @Inject(SupTextareaComponent)
    private readonly textarea: SupTextareaComponent
  ) {}

  onValueChange(value: string): void {
    this.textarea.onValueChange(value);
  }
}
