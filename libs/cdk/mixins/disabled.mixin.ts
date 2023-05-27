import {
  SupAbstractConstructor,
  SupConstructor,
  supCoerceBooleanProperty,
  SupImplicitBoolean,
} from '@supply/cdk/utils';
import { SupCanDisable, SupHasElementRef } from '@supply/cdk/interfaces';
import { SupDomHandler } from '@supply/cdk/abstract';

type CanDisableCtor = SupAbstractConstructor<SupCanDisable>;

export function supMixinDisabled<TSuper extends SupAbstractConstructor<SupHasElementRef>>(
  Super: TSuper,
  defaultDisabled?: boolean,
): CanDisableCtor & TSuper;
export function supMixinDisabled<TSuper extends SupConstructor<SupHasElementRef>>(
  Super: TSuper,
  defaultDisabled = false,
): CanDisableCtor & TSuper {
  return class MixinDisabled extends Super implements SupCanDisable {
    private _disabled = defaultDisabled;

    get disabled(): boolean {
      return this._disabled;
    }

    set disabled(value: SupImplicitBoolean) {
      const disabled = supCoerceBooleanProperty(value);
      const { nativeElement } = this.elementRef;

      SupDomHandler.toggleClass(nativeElement, 'sup-disabled', disabled);

      this._disabled = disabled;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
