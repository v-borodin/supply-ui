import { Directive, inject, InjectionToken, Input, ValueProvider } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { SupShape, SupSize } from '@supply/cdk';

export interface SupDropdownOptions extends ConnectedPosition {
  title?: ReflectiveContent;

  hasClose?: boolean;

  size: Exclude<SupSize, 'xs' | 'xl' | 'xxl'>;

  shape: Exclude<SupShape, 'circle'>;
}

const supDropdownDefaultOptions: SupDropdownOptions = {
  size: 'md',

  shape: 'rounded',

  offsetY: 4,

  originX: 'start',

  originY: 'bottom',

  overlayX: 'start',

  overlayY: 'top',
};

export const SUP_DROPDOWN_OPTIONS = new InjectionToken<SupDropdownOptions>(
  '@uikit/components:DROPDOWN_OPTIONS',
  {
    factory: () => supDropdownDefaultOptions,
  },
);

export const supDropdownOptionsProvider: (options: Partial<SupDropdownOptions>) => ValueProvider = (
  options: Partial<SupDropdownOptions>,
) => ({
  provide: SUP_DROPDOWN_OPTIONS,
  useValue: { ...supDropdownDefaultOptions, ...options },
});

type SupDropdownWidth = 'triggerWidth' | 'auto';

@Directive()
export abstract class SupAbstractDropdownOptions implements SupDropdownOptions {
  private readonly options = inject(SUP_DROPDOWN_OPTIONS, { skipSelf: true });

  @Input('supDropdownSize')
  size = this.options.size;

  @Input('supDropdownShape')
  shape = this.options.shape;

  @Input('supDropdownTitle')
  title = this.options.title;

  @Input('supDropdownWidth')
  width: number | string = 'auto';

  @Input('supDropdownMaxWidth')
  maxWidth?: SupDropdownWidth;

  @Input('supDropdownHasClose')
  hasClose = this.options.hasClose;

  @Input()
  offsetY = this.options.offsetY;

  @Input()
  offsetX = this.options.offsetX;

  @Input()
  originX = this.options.originX;

  @Input()
  originY = this.options.originY;

  @Input()
  overlayX = this.options.overlayX;

  @Input()
  overlayY = this.options.overlayY;
}
