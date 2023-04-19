import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import { SupElement, SupHasSize, SupSize } from '@supply/cdk/interfaces';
import { SupDomHandler } from '@supply/cdk/abstract';
import { SupPrefixed } from '@supply/cdk/types';

type SizeCtor = SupAbstractConstructor<SupHasSize>;

export function supMixinSize<TSuper extends SupAbstractConstructor<SupElement>>(
  Super: TSuper,
  defaultSize?: SupSize
): SizeCtor & TSuper;
export function supMixinSize<TSuper extends SupConstructor<SupElement>>(
  Super: TSuper,
  defaultSize?: SupSize
): SizeCtor & TSuper {
  return class MixinSize extends Super implements SupHasSize {
    private _size: SupSize;

    get size(): SupSize {
      return this._size;
    }

    set size(value: SupSize) {
      const size = value ?? defaultSize;

      SupDomHandler.changeClass<SupPrefixed>(this.element, {
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
