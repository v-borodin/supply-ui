import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import { SupCanLoadable, SupManipulativeElement } from '@supply/cdk/interfaces';

type LoadableCtor = SupAbstractConstructor<SupCanLoadable>;

export function supMixinLoadable<
  TSuper extends SupAbstractConstructor<SupManipulativeElement>
>(Super: TSuper, defaultLoading?: boolean): LoadableCtor & TSuper;
export function supMixinLoadable<
  TSuper extends SupConstructor<SupManipulativeElement>
>(Super: TSuper, defaultLoading = false): LoadableCtor & TSuper {
  return class MixinLoadable extends Super implements SupCanLoadable {
    private _loading = defaultLoading;

    get loading(): boolean {
      return this._loading;
    }

    set loading(loading) {
      this.toggleClass('loading', loading);
      this._loading = loading;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
