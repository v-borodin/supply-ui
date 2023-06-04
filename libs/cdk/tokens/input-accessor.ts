import { InjectionToken } from '@angular/core';
import { SupInputAccessor } from '@supply/cdk/interfaces';

export const SUP_INPUT_ACCESSOR = new InjectionToken<SupInputAccessor>(
  '@cdk/tokens:INPUT_ACCESSOR_TOKEN'
);
