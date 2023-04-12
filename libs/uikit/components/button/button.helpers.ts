import { InjectionToken } from '@angular/core';
import { SupAppearance, SupShape, SupSize } from '@supply/cdk';

export interface SupButtonOptions {
  readonly appearance?: SupAppearance;

  readonly size?: SupSize;

  readonly shape?: SupShape;
}

const supButtonDefaultOptions: Required<SupButtonOptions> = {
  appearance: 'primary',

  size: 'md',

  shape: 'rounded',
};

export const SUP_BUTTON_OPTIONS = new InjectionToken<SupButtonOptions>(
  '@button:OPTIONS_TOKEN',
  {
    factory: () => supButtonDefaultOptions,
  }
);
