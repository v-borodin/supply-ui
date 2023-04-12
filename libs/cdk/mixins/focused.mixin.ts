import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import {
  SupCanDisable,
  SupCanFocus,
  SupCanAlterable,
} from '@supply/cdk/interfaces';

type CanFocusCtor = SupAbstractConstructor<SupCanFocus>;

export function supMixinFocused<
  TSuper extends SupAbstractConstructor<SupCanDisable & SupCanAlterable>
>(Super: TSuper, defaultFocused?: boolean): CanFocusCtor & TSuper;
export function supMixinFocused<
  TSuper extends SupConstructor<SupCanDisable & SupCanAlterable>
>(Super: TSuper, defaultFocused = false): CanFocusCtor & TSuper {
  return class MixinFocused extends Super implements SupCanFocus {
    private _focused = defaultFocused;

    get focused(): boolean {
      return !this.disabled && this._focused;
    }

    set focused(value) {
      this.toggleClass('focused', value);
      this._focused = value;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
