import { InjectionToken, Injector, Type } from '@angular/core';
import { SupNotificationOptions } from '../notification';
import { SupAlertHostComponent } from './alert-host/alert-host.component';
import { BehaviorSubject } from 'rxjs';
import { ReflectiveContent } from '@coreteq/ngx-projection';

type SupPosition = {
  top?: number;

  left?: number;

  right?: number;

  bottom?: number;
};

/**
 * Injection token for the dialog's component renderer
 * You can override this by providers
 * @example
 * {
 *   provide: SUP_DIALOG_CONTAINER,
 *   useFactory: () => MyOwnDialogContainerComponent,
 * }
 */
export const SUP_ALERT_HOST_CONTAINER = new InjectionToken<Type<unknown>>(
  '@uikit/components:ALERT_DEFAULT_CONTAINER',
  {
    factory: () => SupAlertHostComponent,
  }
);

export const SUP_ALERT_OPTIONS = new InjectionToken<SupAlertOptions>(
  '@uikit/components:ALERT_OPTIONS',
  {
    factory: () => supDefaultAlertOptions,
  }
);

export const SUP_ALERT_LIST = new InjectionToken<BehaviorSubject<SupAlert[]>>(
  '@uikit/components:ALERTS_LIST'
);

export const SUP_ALERT_CONFIGURATION = new InjectionToken<SupAlertConfiguration>(
  '@uikit/components:ALERT_CONFIGURATION'
);

export interface SupAlertConfiguration {
  component: Type<any>;

  hostPosition: SupPosition;
}

export interface SupAlertOptions extends SupNotificationOptions {
  autoClose: number;
}

const supDefaultAlertOptions: SupAlertOptions = {
  autoClose: 3000,

  appearance: 'secondary',

  status: 'info',

  hasClose: true,

  hasIcon: true,

  shape: 'rounded',
};

export type SupAlertContext = {
  content: ReflectiveContent;
  id: string;
} & SupAlertOptions;

export interface SupAlert<TContainer = unknown> {
  id: string;

  component: Type<TContainer>;

  injector: Injector;
}
