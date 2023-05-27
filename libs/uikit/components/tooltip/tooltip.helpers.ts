import { Directive, inject, InjectionToken, Input, Type } from '@angular/core';
import { SupShape } from '@supply/cdk';
import { SupTooltipComponent } from './tooltip.component';

export type SupTooltipAppearance = 'primary' | 'danger' | string;

export type SupTooltipPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after';

export const SUP_TOOLTIP_HOST = new InjectionToken<Type<unknown>>(
  '@uikit/components:TOOLTIP_HOST_PROVIDER',
  {
    factory: () => SupTooltipComponent,
  },
);

export const SUP_TOOLTIP_OPTIONS = new InjectionToken<SupTooltipOptions>(
  '@uikit/components:TOOLTIP_OPTIONS_TOKEN',
  {
    factory: () => supTooltipDefaultOptions,
  },
);

export interface SupTooltipOptions {
  appearance: SupTooltipAppearance;

  shape: Exclude<SupShape, 'circle'>;

  showDelay: number;

  hideDelay: number;

  position: SupTooltipPosition;

  offset: number;

  positionAtOrigin: boolean;

  viewportMargin: number;
}

const supTooltipDefaultOptions: SupTooltipOptions = {
  appearance: 'primary',

  shape: 'rounded',

  position: 'above',

  offset: 4,

  showDelay: 50,

  hideDelay: 0,

  positionAtOrigin: false,

  viewportMargin: 8,
};

@Directive()
export abstract class SupAbstractTooltipOptions
  implements Omit<SupTooltipOptions, 'showDelay' | 'hideDelay'>
{
  private readonly options = inject(SUP_TOOLTIP_OPTIONS, { skipSelf: true });

  @Input('supTooltipAppearance')
  appearance = this.options.appearance;

  @Input('supTooltipShape')
  shape = this.options.shape;

  @Input('supTooltipPosition')
  position = this.options.position;

  @Input('supTooltipOffset')
  offset = this.options.offset;

  @Input()
  positionAtOrigin = this.options.positionAtOrigin;

  @Input()
  viewportMargin = this.options.viewportMargin;
}
