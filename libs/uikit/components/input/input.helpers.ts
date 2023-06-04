import { InjectionToken } from '@angular/core';
import { SupShape, SupSize } from '@supply/cdk';

export interface SupTextInputOptions {
  readonly appearance: 'primary' | 'secondary' | string;

  readonly size: SupSize;

  readonly shape: Exclude<SupShape, 'circle'>;

  readonly hasClear: boolean;
}

const supTextInputDefaultOptions: Required<SupTextInputOptions> = {
  appearance: 'primary',

  size: 'md',

  shape: 'rounded',

  hasClear: true,
};

export const SUP_INPUT_OPTIONS = new InjectionToken<SupTextInputOptions>(
  '@uikit/components:TEXT_INPUT_OPTIONS_TOKEN',
  {
    factory: () => supTextInputDefaultOptions,
  },
);
