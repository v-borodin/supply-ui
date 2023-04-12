import { SupCanReadonly, SupHasSize, SupInteractiveElement } from '@supply/cdk';
import {
  ExistingProvider,
  forwardRef,
  InjectionToken,
  Type,
} from '@angular/core';
import { SupInputComponent } from '@supply/uikit/components';

/** Model */
export interface SupInputModel
  extends SupInteractiveElement,
    SupCanReadonly,
    SupHasSize {
  name: string | null;

  required: boolean | undefined;

  clear(): void;
}

/** Size */
type UnsupportedSizes = 'xs' | 'lg' | 'xl' | 'xxl';
// export type SupInputSize = Exclude<SupSize, UnsupportedSizes>;

/** Token */
export const SUP_INPUT = new InjectionToken<SupInputComponent>(
  '@input:SUP_INPUT'
);

export function provideInstance<T>(
  token: InjectionToken<T>,
  instance: Type<T>
): ExistingProvider {
  return {
    provide: token,
    useExisting: forwardRef(() => instance),
  };
}
