import { Directive, Inject } from '@angular/core';
import { SUP_INPUT_ACCESSOR } from '@supply/cdk';
import { SupSelectComponent } from './select.component';

@Directive({
  selector: 'sup-select',
  providers: [
    {
      provide: SUP_INPUT_ACCESSOR,
      useExisting: SupSelectDirective,
    },
  ],
})
export class SupSelectDirective {
  get id(): string {
    return this.select.id;
  }

  get value(): string {
    return this.select.computedValue;
  }

  get readOnly(): boolean {
    return true;
  }

  constructor(
    @Inject(SupSelectComponent)
    private readonly select: SupSelectComponent<unknown>,
  ) {}

  onValueChange(value: string): void {
    this.select.onValueChange(value);
  }
}
