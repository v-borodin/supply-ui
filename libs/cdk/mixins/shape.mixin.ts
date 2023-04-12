import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import { SupCanAlterable, SupHasShape, SupShape } from '@supply/cdk/interfaces';

type ShapeCtor = SupAbstractConstructor<SupHasShape>;

export function supMixinShape<
  TSuper extends SupAbstractConstructor<SupCanAlterable>
>(Super: TSuper, defaultShape?: SupShape): ShapeCtor & TSuper;
export function supMixinShape<TSuper extends SupConstructor<SupCanAlterable>>(
  Super: TSuper,
  defaultShape?: SupShape
): ShapeCtor & TSuper {
  return class MixinShape extends Super implements SupHasShape {
    private _shape: SupShape;

    get shape(): SupShape {
      return this._shape;
    }

    set shape(value: SupShape) {
      const shape = value ?? defaultShape;

      this.changeClass({
        current: `sup-shape-${shape}`,
        previous: `sup-shape-${this._shape}`,
      });

      this._shape = shape;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
