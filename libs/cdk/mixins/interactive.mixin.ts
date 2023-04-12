import { supMixinFocused } from './focused.mixin';
import { supMixinDisabled } from './disabled.mixin';
import { supMixinTabIndex } from './tabindex.mixin';
import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import { inject } from '@angular/core';
import { SupIdGeneratorStrategy } from '@supply/cdk/services';
import { SupCanAlterable, SupInteractiveElement } from '@supply/cdk/interfaces';

type InteractiveConstructor = SupConstructor<SupInteractiveElement> &
  SupAbstractConstructor<SupInteractiveElement>;

export function supMixinInteractive<
  TSuper extends SupAbstractConstructor<SupCanAlterable>
>(Super: TSuper): InteractiveConstructor & TSuper;
export function supMixinInteractive<
  TSuper extends SupConstructor<SupCanAlterable>
>(Super: TSuper): InteractiveConstructor & TSuper {
  return class MixinInteractive
    extends supMixinFocused(supMixinTabIndex(supMixinDisabled(Super)))
    implements SupInteractiveElement
  {
    private readonly idService = inject(SupIdGeneratorStrategy);

    private readonly generatedId: string;

    protected _id?: string;

    get id(): string {
      return this._id || this.generatedId;
    }

    set id(value: string) {
      this._id = value;
    }

    constructor(...args: any[]) {
      super(...args);
      this.generatedId = this.idService.generate();
    }
  };
}
