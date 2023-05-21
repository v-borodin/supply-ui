import { InjectionToken } from '@angular/core';
import { AnimationOptions } from '@angular/animations';

export const SUP_DEFAULT_TRANSITION = `{{duration}}ms ease-in-out`;
export const SUP_DEFAULT_DURATION = { params: { duration: 300 } };

export const SUP_ANIMATION_OPTIONS = new InjectionToken<AnimationOptions>(
  '@animation:OPTIONS_TOKEN',
  {
    factory: () => ({
      params: {
        duration: 300,
      },
    }),
  },
);
