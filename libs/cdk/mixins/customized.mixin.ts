import { supMixinAppearance } from './appearence.mixin';
import { supMixinSize } from './size.mixin';
import { supMixinShape } from './shape.mixin';
import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import { SupCustomizedElement, SupHasElementRef } from '@supply/cdk/interfaces';

type CustomizedConstructor = SupConstructor<SupCustomizedElement>;

/** Mixin that combines the properties of SupHasAppearance, SupHasSize, SupHasShape  */
export function supMixinCustomized<TSuper extends SupAbstractConstructor<SupHasElementRef>>(
  Super: TSuper,
): CustomizedConstructor & TSuper;
export function supMixinCustomized<TSuper extends SupConstructor<SupHasElementRef>>(
  Super: TSuper,
): CustomizedConstructor & TSuper {
  return class MixinCustomized
    extends supMixinAppearance(supMixinSize(supMixinShape(Super)))
    implements SupCustomizedElement
  {
    constructor(...args: any[]) {
      super(...args);
    }
  };
}
