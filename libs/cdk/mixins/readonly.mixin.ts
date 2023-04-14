import {
  SupAbstractConstructor,
  supCoerceBooleanProperty,
  SupConstructor,
  SupImplicitBoolean,
} from '@supply/cdk/utils';
import { SupCanReadonly, SupElement } from '@supply/cdk/interfaces';
import { SupDomHandler } from '@supply/cdk/abstract';

type CanReadonlyCtor = SupAbstractConstructor<SupCanReadonly>;

export function supMixinReadonly<
  TSuper extends SupAbstractConstructor<SupElement>
>(Super: TSuper, defaultReadonly?: boolean): CanReadonlyCtor & TSuper;
export function supMixinReadonly<TSuper extends SupConstructor<SupElement>>(
  Super: TSuper,
  defaultReadonly = false
): CanReadonlyCtor & TSuper {
  return class MixinReadonly extends Super implements SupCanReadonly {
    private _readonly = defaultReadonly;

    get readonly(): boolean {
      return this._readonly;
    }

    set readonly(value: SupImplicitBoolean) {
      const readonly = supCoerceBooleanProperty(value);

      SupDomHandler.toggleClass(this.element, 'readonly', readonly);

      this._readonly = readonly;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
