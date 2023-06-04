import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  Input,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { SUP_BUTTON_OPTIONS, SupButtonOptions } from './button.helpers';
import {
  SUP_FOCUSABLE_ELEMENT,
  SupFocusTrackerDirective,
  supMixinCustomized,
  supMixinInteractive,
  supMixinLoadable,
} from '@supply/cdk';
import { SupLoaderComponent } from '@supply/uikit/components/loader';
import { SupIconComponent } from '@supply/uikit/components/icon';
import { NgxContentOutlet, ReflectiveContent } from '@coreteq/ngx-projection';

const ButtonMixin = supMixinInteractive(
  supMixinLoadable(
    supMixinCustomized(
      class {
        constructor(readonly elementRef: ElementRef) {}
      }
    )
  )
);

@Component({
  selector: 'button[supButton], button[supIconButton], a[supButton], a[supIconButton]',
  exportAs: 'supButton',
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  inputs: ['loading', 'disabled', 'id'],
  host: {
    role: 'button',
    '[attr.aria-disabled]': '(disabled || loading).toString()',
  },
  hostDirectives: [SupFocusTrackerDirective],
  providers: [
    {
      provide: SUP_FOCUSABLE_ELEMENT,
      useExisting: forwardRef(() => SupButtonComponent),
    },
  ],
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet,
    SupLoaderComponent,
    SupIconComponent,
    NgxContentOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupButtonComponent extends ButtonMixin {
  @Input()
  override appearance = this.options.appearance;

  @Input()
  override size = this.options.size;

  @Input()
  override shape = this.options.shape;

  @Input()
  icon: ReflectiveContent;

  @Input()
  iconRight: ReflectiveContent;

  @HostBinding('attr.disabled')
  get isDisabled(): '' | null {
    return this.disabled || this.loading ? '' : null;
  }

  constructor(
    @Inject(SUP_BUTTON_OPTIONS) private readonly options: SupButtonOptions,
    @Inject(ElementRef) elementRef: ElementRef
  ) {
    super(elementRef);
  }
}
