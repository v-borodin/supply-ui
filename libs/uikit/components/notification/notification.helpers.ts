import { InjectionToken } from '@angular/core';
import { SupShape } from '@supply/cdk';

export type SupStatusType = 'info' | 'success' | 'warning' | 'error';

export interface SupNotificationOptions {
  readonly status: SupStatusType;

  readonly hasIcon: boolean;

  readonly hasClose: boolean;

  readonly shape: Exclude<SupShape, 'circle'>;
}

const defaultNotificationOptions: Readonly<SupNotificationOptions> = {
  hasIcon: true,

  hasClose: true,

  status: 'info',

  shape: 'rounded',
};

export const SUP_NOTIFICATION_OPTIONS = new InjectionToken(
  '@notification:OPTIONS_TOKEN',
  {
    factory: () => defaultNotificationOptions,
  }
);
