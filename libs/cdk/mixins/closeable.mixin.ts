import { EventEmitter } from '@angular/core';
import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';

export interface CanClose {
  close: EventEmitter<void>;
}

type CloseCtor = SupConstructor<CanClose> & SupAbstractConstructor<CanClose>;

export function supMixinClose<TSuper extends SupAbstractConstructor>(
  Super: TSuper
): CloseCtor & TSuper;
export function supMixinClose<TSuper extends SupConstructor>(
  Super: TSuper
): CloseCtor & TSuper {
  return class MixinClose extends Super implements CanClose {
    close = new EventEmitter<void>();

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
