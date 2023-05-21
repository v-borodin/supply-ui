import { inject, InjectionToken, Type } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { SupDialogOptions } from '@supply/cdk';
import { SupDialogComponent } from './dialog.component';

/**
 * Injection token for the dialog's component renderer
 * You can override this by providers
 * @example
 * {
 *   provide: SUP_DIALOG_CONTAINER,
 *   useFactory: () => MyOwnDialogContainerComponent,
 * }
 */
export const SUP_DIALOG_CONTAINER = new InjectionToken<Type<unknown>>(
  '@uikit/components:DIALOG_DEFAULT_CONTAINER',
  {
    factory: () => SupDialogComponent,
  }
);

export const SUP_DIALOG_OPTIONS = new InjectionToken<SupDialogOptions>(
  '@uikit/components:DIALOG_OPTIONS',
  {
    factory: () => {
      return {
        ...supDialogDefaultOptions,
        overlayConfig: new SupDialogOverlayConfig(),
      };
    },
  }
);

const supDialogDefaultOptions: SupDialogOptions = {
  size: 'md',

  dismissible: true,

  role: 'dialog',

  closable: true,

  data: null,
};

export class SupDialogOverlayConfig extends OverlayConfig {
  private readonly overlay = inject(Overlay);

  override hasBackdrop = true;

  override positionStrategy = this.overlay
    .position()
    .global()
    .centerHorizontally()
    .centerVertically();

  override scrollStrategy = this.overlay.scrollStrategies.block();

  override disposeOnNavigation = true;
}
