import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Inject,
  Input,
  TemplateRef,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { SUP_BUTTON_OPTIONS, SupButtonOptions } from './button.helpers';
import {
  SupAbstractElementBinder,
  supMixinCustomized,
  supMixinInteractive,
  supMixinLoadable,
} from '@supply/cdk';
import { SupLoaderComponent } from '@supply/uikit/components';

const SupButtonMixin = supMixinInteractive(
  supMixinLoadable(supMixinCustomized(SupAbstractElementBinder))
);

@Component({
  selector: 'button[supButton], a[supButton]',
  exportAs: 'supButton',
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  inputs: ['loading', 'disabled'],
  host: {
    role: 'button',
    '[attr.aria-disabled]': '(disabled || loading).toString()',
  },
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, SupLoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupButtonComponent extends SupButtonMixin {
  @Input()
  override appearance = this.options.appearance;

  @Input()
  override size = this.options.size;

  @Input()
  override shape = this.options.shape;

  @Input()
  iconLeft: TemplateRef<any> | undefined | null;

  @Input()
  iconRight: TemplateRef<any> | undefined | null;

  @HostBinding('attr.disabled')
  get isDisabled(): '' | null {
    return this.disabled || this.loading ? '' : null;
  }

  constructor(
    @Inject(SUP_BUTTON_OPTIONS) private readonly options: SupButtonOptions
  ) {
    super();
  }

  @HostListener('focusin', ['true'])
  @HostListener('focusout', ['false'])
  onFocus(focused: boolean): void {
    this.focused = focused;
  }
}
