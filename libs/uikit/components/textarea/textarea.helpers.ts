import { InjectionToken } from '@angular/core';
import { SupTextInputOptions } from '../input';

export interface SupTextareaOptions extends SupTextInputOptions {
  defaultRows: number;
}

const supTextareaDefaultOptions: Required<SupTextareaOptions> = {
  appearance: 'primary',

  size: 'md',

  shape: 'rounded',

  hasClear: true,

  defaultRows: 3,
};

export const SUP_TEXTAREA_OPTIONS = new InjectionToken<SupTextareaOptions>(
  '@uikit/components:TEXTAREA_OPTIONS_TOKEN',
  {
    factory: () => supTextareaDefaultOptions,
  },
);
