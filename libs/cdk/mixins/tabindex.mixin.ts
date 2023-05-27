import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import { SupCanDisable, SupHasElementRef, SupHasTabIndex } from '@supply/cdk/interfaces';
import { SupDomHandler } from '@supply/cdk/abstract';

type TabIndexCtor = SupAbstractConstructor<SupHasTabIndex>;

export function supMixinTabIndex<
  TSuper extends SupAbstractConstructor<SupCanDisable & SupHasElementRef>,
>(Super: TSuper, defaultTabIndex?: number): TabIndexCtor & TSuper;
export function supMixinTabIndex<TSuper extends SupConstructor<SupCanDisable & SupHasElementRef>>(
  Super: TSuper,
  defaultTabIndex = 0,
): TabIndexCtor & TSuper {
  return class MixinTabIndex extends Super implements SupHasTabIndex {
    private _tabIndex: number = defaultTabIndex;

    defaultTabIndex = defaultTabIndex;

    get tabIndex(): number {
      return this.disabled ? -1 : this._tabIndex;
    }

    set tabIndex(value) {
      const tabIndex = value != null ? value : this.defaultTabIndex;
      const { nativeElement } = this.elementRef;

      SupDomHandler.setAttribute(nativeElement, 'tabIndex', tabIndex.toString());

      this._tabIndex = tabIndex;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
