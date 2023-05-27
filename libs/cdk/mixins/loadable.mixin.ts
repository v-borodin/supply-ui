import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import { SupCanLoadable, SupHasElementRef } from '@supply/cdk/interfaces';
import { SupDomHandler } from '@supply/cdk/abstract';

type LoadableCtor = SupAbstractConstructor<SupCanLoadable>;

export function supMixinLoadable<TSuper extends SupAbstractConstructor<SupHasElementRef>>(
  Super: TSuper,
  defaultLoading?: boolean,
): LoadableCtor & TSuper;
export function supMixinLoadable<TSuper extends SupConstructor<SupHasElementRef>>(
  Super: TSuper,
  defaultLoading = false,
): LoadableCtor & TSuper {
  return class MixinLoadable extends Super implements SupCanLoadable {
    private _loading = defaultLoading;

    get loading(): boolean {
      return this._loading;
    }

    set loading(loading) {
      const { nativeElement } = this.elementRef;

      SupDomHandler.toggleClass(nativeElement, 'sup-loading', loading);

      this._loading = loading;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
