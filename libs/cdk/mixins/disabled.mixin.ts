import {
  SupAbstractConstructor,
  SupConstructor,
  supCoerceBooleanProperty,
  SupImplicitBoolean,
} from '@supply/cdk/utils';
import { SupCanDisable, SupManipulativeElement } from '@supply/cdk/interfaces';

type CanDisableCtor = SupAbstractConstructor<SupCanDisable>;

export function supMixinDisabled<
  TSuper extends SupAbstractConstructor<SupManipulativeElement>
>(Super: TSuper, defaultDisabled?: boolean): CanDisableCtor & TSuper;
export function supMixinDisabled<
  TSuper extends SupConstructor<SupManipulativeElement>
>(Super: TSuper, defaultDisabled = false): CanDisableCtor & TSuper {
  return class MixinDisabled extends Super implements SupCanDisable {
    private _disabled = defaultDisabled;

    get disabled(): boolean {
      return this._disabled;
    }

    set disabled(value: SupImplicitBoolean) {
      const disabled = supCoerceBooleanProperty(value);

      this.toggleClass('disabled', disabled);
      this._disabled = disabled;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
