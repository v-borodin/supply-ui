import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Optional,
} from '@angular/core';
import {
  SUP_DATA_LIST_CONTROLLER,
  SupDataListController,
  supMixinDisabled,
  supMixinSize,
} from '@supply/cdk';
import { SupDataListComponent } from './data-list.component';

const OptionMixin = supMixinDisabled(
  supMixinSize(
    class {
      constructor(readonly elementRef: ElementRef) {}
    }
  )
);

@Component({
  selector: 'button[supOption], a[supOption]',
  templateUrl: './option.html',
  styleUrls: ['./option.scss'],
  host: {
    tabIndex: '-1',
    type: 'button',
    '[attr.disabled]': 'disabled || null',
  },
  inputs: ['value', 'role', 'disabled', 'size'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupOptionComponent<TValue = unknown> extends OptionMixin {
  @HostBinding('attr.role')
  role = 'option';

  value: TValue | null = null;

  constructor(
    @Inject(forwardRef(() => SupDataListComponent))
    private readonly dataList: SupDataListComponent<TValue>,
    @Inject(ElementRef) override readonly elementRef: ElementRef<HTMLElement>,
    @Optional()
    @Inject(SUP_DATA_LIST_CONTROLLER)
    private readonly controller: SupDataListController<TValue> | null
  ) {
    super(elementRef);
  }

  @HostListener('click')
  onClick(): void {
    if (this.controller && this.value !== undefined) {
      this.controller.handleOption(this.value);
    }
  }
}
