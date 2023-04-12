import { EventEmitter } from '@angular/core';
import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';

export interface CanClose {
  close: EventEmitter<void>;
}

type CloseConstructor = SupConstructor<CanClose> &
  SupAbstractConstructor<CanClose>;

export function supMixinClose<TSuper extends SupAbstractConstructor>(
  Super: TSuper
): CloseConstructor & TSuper;
export function supMixinClose<TSuper extends SupConstructor>(
  Super: TSuper
): CloseConstructor & TSuper {
  return class MixinCloseFactory extends Super implements CanClose {
    close = new EventEmitter<void>();

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
