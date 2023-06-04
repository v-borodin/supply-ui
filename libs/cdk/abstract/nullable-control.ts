import { Directive } from '@angular/core';
import { SupAbstractControl } from './control';

@Directive()
export abstract class SupAbstractNullableControl<T> extends SupAbstractControl<T | null> {
  protected getFallbackValue(): T | null {
    return null;
  }
}
