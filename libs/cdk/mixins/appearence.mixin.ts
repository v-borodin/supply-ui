import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import {
  SupHasAppearance,
  SupAppearance,
  SupCanAlterable,
} from '@supply/cdk/interfaces';

type AppearanceCtor = SupConstructor<SupHasAppearance> &
  SupAbstractConstructor<SupHasAppearance>;

export function supMixinAppearance<
  TSuper extends SupAbstractConstructor<SupCanAlterable>
>(Super: TSuper, defaultAppearance?: SupAppearance): AppearanceCtor & TSuper;
export function supMixinAppearance<
  TSuper extends SupConstructor<SupCanAlterable>
>(Super: TSuper, defaultAppearance?: SupAppearance): AppearanceCtor & TSuper {
  return class MixinAppearance extends Super implements SupHasAppearance {
    private _appearance: SupAppearance;

    get appearance(): SupAppearance {
      return this._appearance;
    }

    set appearance(value: SupAppearance) {
      const appearance = value ?? defaultAppearance;

      this.changeClass({
        current: `sup-appearance-${appearance}`,
        previous: `sup-appearance-${this._appearance}`,
      });

      this._appearance = appearance;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
