import { SupAbstractConstructor, SupConstructor } from '@supply/cdk/utils';
import {
  SupCanDisable,
  SupManipulativeElement,
  SupHasTabIndex,
} from '@supply/cdk/interfaces';

type TabIndexCtor = SupAbstractConstructor<SupHasTabIndex>;

export function supMixinTabIndex<
  TSuper extends SupAbstractConstructor<SupCanDisable & SupManipulativeElement>
>(Super: TSuper, defaultTabIndex?: number): TabIndexCtor & TSuper;
export function supMixinTabIndex<
  TSuper extends SupConstructor<SupCanDisable & SupManipulativeElement>
>(Super: TSuper, defaultTabIndex = 0): TabIndexCtor & TSuper {
  return class MixinTabIndex extends Super implements SupHasTabIndex {
    private _tabIndex: number = defaultTabIndex;

    defaultTabIndex = defaultTabIndex;

    get tabIndex(): number {
      return this.disabled ? -1 : this._tabIndex;
    }

    set tabIndex(value) {
      const tabIndex = value != null ? value : this.defaultTabIndex;

      this.setAttribute('tabIndex', tabIndex.toString());
      this._tabIndex = tabIndex;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
