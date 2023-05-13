import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import { SupDomHandler } from '@supply/cdk/abstract';
import { SupCanReadonly, SupHasElementRef, SupHasValidity } from '@supply/cdk/interfaces';

type ValidityCtor = SupAbstractConstructor<SupHasValidity>;

export function supMixinInvalid<
  TSuper extends SupAbstractConstructor<SupCanReadonly & SupHasElementRef>,
>(Super: TSuper, defaultInvalid?: boolean): ValidityCtor & TSuper;
export function supMixinInvalid<TSuper extends SupConstructor<SupCanReadonly & SupHasElementRef>>(
  Super: TSuper,
  defaultInvalid = false,
): ValidityCtor & TSuper {
  return class MixinFocused extends Super implements SupHasValidity {
    private _invalid = defaultInvalid;

    get invalid(): boolean {
      return !this.readOnly && this._invalid;
    }

    set invalid(value) {
      if (this.readOnly) {
        return;
      }

      const { nativeElement } = this.elementRef;
      SupDomHandler.toggleClass(nativeElement, 'sup-invalid', value);

      this._invalid = value;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
