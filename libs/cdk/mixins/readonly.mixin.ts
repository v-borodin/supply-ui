import {
  SupAbstractConstructor,
  supCoerceBooleanProperty,
  SupConstructor,
  SupImplicitBoolean,
} from '@supply/cdk/utils';
import { SupCanReadonly, SupHasElementRef } from '@supply/cdk/interfaces';
import { SupDomHandler } from '@supply/cdk/abstract';

type CanReadonlyCtor = SupAbstractConstructor<SupCanReadonly>;

export function supMixinReadonly<TSuper extends SupAbstractConstructor<SupHasElementRef>>(
  Super: TSuper,
  defaultReadonly?: boolean,
): CanReadonlyCtor & TSuper;
export function supMixinReadonly<TSuper extends SupConstructor<SupHasElementRef>>(
  Super: TSuper,
  defaultReadonly = false,
): CanReadonlyCtor & TSuper {
  return class MixinReadonly extends Super implements SupCanReadonly {
    private _readonly = defaultReadonly;

    get readOnly(): boolean {
      return this._readonly;
    }

    set readOnly(value: SupImplicitBoolean) {
      const readonly = supCoerceBooleanProperty(value);
      const { nativeElement } = this.elementRef;

      SupDomHandler.toggleClass(nativeElement, 'sup-readonly', readonly);

      this._readonly = readonly;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
