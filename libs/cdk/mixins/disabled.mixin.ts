import {
  SupAbstractConstructor,
  SupConstructor,
  supCoerceBooleanProperty,
  SupImplicitBoolean,
} from '@supply/cdk/utils';
import { SupCanDisable, SupCanAlterable } from '@supply/cdk/interfaces';

type CanDisableCtor = SupAbstractConstructor<SupCanDisable>;

export function supMixinDisabled<
  TSuper extends SupAbstractConstructor<SupCanAlterable>
>(Super: TSuper, defaultDisabled?: boolean): CanDisableCtor & TSuper;
export function supMixinDisabled<
  TSuper extends SupConstructor<SupCanAlterable>
>(Super: TSuper, defaultDisabled = false): CanDisableCtor & TSuper {
  return class MixinDisabled extends Super implements SupCanDisable {
    private _disabled = defaultDisabled;

    get disabled(): boolean {
      return this._disabled;
    }

    set disabled(value: SupImplicitBoolean) {
      const disabled = supCoerceBooleanProperty(value);
      this.toggleClass('disabled', disabled);
      this._disabled = disabled;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
