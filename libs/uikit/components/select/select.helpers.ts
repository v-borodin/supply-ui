import { InjectionToken } from '@angular/core';
import { SupTextInputOptions } from '../input';

export interface SupSelectOptions<TValue = any> extends SupTextInputOptions {
  stringify: (option: TValue) => string;
}

const supSelectDefaultOptions: SupSelectOptions = {
  stringify: value => String(value),

  appearance: 'secondary',

  size: 'md',

  shape: 'rounded',

  hasClear: false,
};

export const SUP_SELECT_OPTIONS = new InjectionToken<SupTextInputOptions>(
  '@uikit/components:SELECT_OPTIONS_TOKEN',
  {
    factory: () => supSelectDefaultOptions,
  },
);
