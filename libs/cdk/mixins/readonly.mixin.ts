import {
  SupAbstractConstructor,
  SupCanReadonly,
  SupConstructor,
  supCoerceBooleanProperty,
  SupImplicitBoolean,
  SupCanAlterable,
} from '@supply/cdk';

type CanReadonlyCtor = SupAbstractConstructor<SupCanReadonly>;

export function supMixinReadonly<
  TSuper extends SupAbstractConstructor<SupCanAlterable>
>(Super: TSuper, defaultReadonly?: boolean): CanReadonlyCtor & TSuper;
export function supMixinReadonly<
  TSuper extends SupConstructor<SupCanAlterable>
>(Super: TSuper, defaultReadonly = false): CanReadonlyCtor & TSuper {
  return class MixinReadonly extends Super implements SupCanReadonly {
    private _readonly = defaultReadonly;

    get readonly(): boolean {
      return this._readonly;
    }

    set readonly(value: SupImplicitBoolean) {
      const readonly = supCoerceBooleanProperty(value);

      this.toggleClass('readonly', readonly);
      this._readonly = readonly;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
