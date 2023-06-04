import { InjectionToken } from '@angular/core';
import { SupShape } from '@supply/cdk';
import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export type SupStatusType = 'info' | 'success' | 'warning' | 'error';

export interface SupNotificationOptions {
  readonly appearance: 'primary' | 'secondary';

  readonly status: SupStatusType;

  readonly hasIcon: boolean;

  readonly hasClose: boolean;

  readonly shape: Exclude<SupShape, 'circle'>;
}

const defaultNotificationOptions: Readonly<SupNotificationOptions> = {
  appearance: 'primary',

  hasIcon: true,

  hasClose: true,

  status: 'info',

  shape: 'rounded',
};

export const SUP_NOTIFICATION_OPTIONS = new InjectionToken('@notification:OPTIONS_TOKEN', {
  factory: () => defaultNotificationOptions,
});

export function FadeInOut(
  timingIn: number,
  timingOut: number,
  height = false,
): AnimationTriggerMetadata {
  return trigger('fadeInOut', [
    transition(':enter', [
      style(height ? { opacity: 0 } : { opacity: 0 }),
      animate(timingIn, style(height ? { opacity: 1 } : { opacity: 1 })),
    ]),
    transition(':leave', [animate(timingOut, style(height ? { opacity: 0 } : { opacity: 0 }))]),
  ]);
}
