import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import { SupControlElement, SupHasElementRef } from '@supply/cdk/interfaces';
import { supMixinInteractive } from './interactive.mixin';
import { supMixinLoadable } from './loadable.mixin';
import { supMixinInvalid } from './invalid.mixin';
import { supMixinReadonly } from './readonly.mixin';

type ControlCtor = SupConstructor<SupControlElement> & SupAbstractConstructor<SupControlElement>;

export function supMixinControl<TSuper extends SupAbstractConstructor<SupHasElementRef>>(
  Super: TSuper,
): ControlCtor & TSuper;
export function supMixinControl<TSuper extends SupConstructor<SupHasElementRef>>(
  Super: TSuper,
): ControlCtor & TSuper {
  return class MixinControlElement
    extends supMixinInteractive(supMixinLoadable(supMixinInvalid(supMixinReadonly(Super))))
    implements SupControlElement
  {
    constructor(...args: any[]) {
      super(...args);
    }
  };
}
