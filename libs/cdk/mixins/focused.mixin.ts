import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import {
  SupCanDisable,
  SupCanFocus,
  SupManipulativeElement,
} from '@supply/cdk/interfaces';

type CanFocusCtor = SupAbstractConstructor<SupCanFocus>;

export function supMixinFocused<
  TSuper extends SupAbstractConstructor<SupCanDisable & SupManipulativeElement>
>(Super: TSuper, defaultFocused?: boolean): CanFocusCtor & TSuper;
export function supMixinFocused<
  TSuper extends SupConstructor<SupCanDisable & SupManipulativeElement>
>(Super: TSuper, defaultFocused = false): CanFocusCtor & TSuper {
  return class MixinFocused extends Super implements SupCanFocus {
    private _focused = defaultFocused;

    get focused(): boolean {
      return !this.disabled && this._focused;
    }

    set focused(value) {
      if (this.disabled) {
        return;
      }

      this.toggleClass('focused', value);
      this._focused = value;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
