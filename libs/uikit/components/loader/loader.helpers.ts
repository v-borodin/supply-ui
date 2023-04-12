import { InjectionToken } from '@angular/core';
import { SupAppearance, SupSize } from '@supply/cdk';

export interface SupLoaderOptions {
  readonly appearance?: SupAppearance;

  readonly size?: SupSize;

  readonly hasOverlay?: boolean;
}

const supLoaderDefaultOptions: Required<SupLoaderOptions> = {
  appearance: 'primary',

  size: 'md',

  hasOverlay: false,
};

export const SUP_LOADER_OPTIONS = new InjectionToken<SupLoaderOptions>(
  '@loader:OPTIONS_TOKEN',
  {
    factory: () => supLoaderDefaultOptions,
  }
);
