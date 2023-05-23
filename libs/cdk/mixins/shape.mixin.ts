import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import { SupHasElementRef, SupHasShape, SupShape } from '@supply/cdk/interfaces';
import { SupDomHandler } from '@supply/cdk/abstract';

type ShapeCtor = SupAbstractConstructor<SupHasShape>;

export function supMixinShape<TSuper extends SupAbstractConstructor<SupHasElementRef>>(
  Super: TSuper,
  defaultShape?: SupShape,
): ShapeCtor & TSuper;
export function supMixinShape<TSuper extends SupConstructor<SupHasElementRef>>(
  Super: TSuper,
  defaultShape?: SupShape,
): ShapeCtor & TSuper {
  return class MixinShape extends Super implements SupHasShape {
    private _shape: SupShape;

    get shape(): SupShape {
      return this._shape;
    }

    set shape(value: SupShape) {
      const shape = value ?? defaultShape;
      const { nativeElement } = this.elementRef;

      SupDomHandler.updateClass(nativeElement, {
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
