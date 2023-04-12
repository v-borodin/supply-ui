import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import {
  SupManipulativeElement,
  SupHasSize,
  SupSize,
} from '@supply/cdk/interfaces';

type SizeCtor = SupAbstractConstructor<SupHasSize>;

export function supMixinSize<
  TSuper extends SupAbstractConstructor<SupManipulativeElement>
>(Super: TSuper, defaultSize?: SupSize): SizeCtor & TSuper;
export function supMixinSize<
  TSuper extends SupConstructor<SupManipulativeElement>
>(Super: TSuper, defaultSize?: SupSize): SizeCtor & TSuper {
  return class MixinSize extends Super implements SupHasSize {
    private _size: SupSize;

    get size(): SupSize {
      return this._size;
    }

    set size(value: SupSize) {
      const size = value ?? defaultSize;

      this.changeClass({
        current: `sup-size-${size}`,
        previous: `sup-size-${this._size}`,
      });

      this._size = size;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
