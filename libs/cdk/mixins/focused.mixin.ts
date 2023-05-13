import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import { SupCanDisable, SupCanFocus, SupHasElementRef } from '@supply/cdk/interfaces';
import { SupDomHandler } from '@supply/cdk/abstract';

type CanFocusCtor = SupAbstractConstructor<SupCanFocus>;

export function supMixinFocused<
  TSuper extends SupAbstractConstructor<SupCanDisable & SupHasElementRef>,
>(Super: TSuper, defaultFocused?: boolean): CanFocusCtor & TSuper;
export function supMixinFocused<TSuper extends SupConstructor<SupCanDisable & SupHasElementRef>>(
  Super: TSuper,
  defaultFocused = false,
): CanFocusCtor & TSuper {
  return class MixinFocused extends Super implements SupCanFocus {
    private _focused = defaultFocused;

    get focused(): boolean {
      return !this.disabled && this._focused;
    }

    set focused(value) {
      if (this.disabled) {
        return;
      }

      const { nativeElement } = this.elementRef;
      SupDomHandler.toggleClass(nativeElement, 'sup-focused', value);

      this._focused = value;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
