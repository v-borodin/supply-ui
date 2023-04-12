import {
  ExistingProvider,
  forwardRef,
  InjectionToken,
  Type,
} from '@angular/core';

export interface SupInputValueAccessor<T> {
  value: T;
}

export const SUP_INPUT_VALUE_ACCESSOR = new InjectionToken<
  SupInputValueAccessor<any>
>('SUP_INPUT_VALUE_ACCESSOR');

export function provideSupValueAccessor<T>(
  type: Type<SupInputValueAccessor<T>>
): ExistingProvider {
  return {
    provide: SUP_INPUT_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
  };
}
