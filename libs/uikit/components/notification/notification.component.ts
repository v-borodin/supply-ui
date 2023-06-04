import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Inject,
} from '@angular/core';
import { NgIf } from '@angular/common';
import {
  supCoerceBooleanProperty,
  SupImplicitBoolean,
  supMixinAppearance,
  supMixinClose,
  supMixinShape,
} from '@supply/cdk';
import {
  SupNotificationOptions,
  SUP_NOTIFICATION_OPTIONS,
  FadeInOut,
} from './notification.helpers';
import { NgxContentOutlet, ReflectiveContent } from '@coreteq/ngx-projection';
import { SupIconComponent } from '@supply/uikit/components/icon';

const NotificationMixin = supMixinAppearance(
  supMixinClose(
    supMixinShape(
      class {
        constructor(readonly elementRef: ElementRef) {}
      }
    )
  )
);

const STATUS_ICON = {
  info: 'supInfo',

  success: 'supSuccess',

  error: 'supError',

  warning: 'supWarning',
} as const;

@Component({
  selector: 'sup-notification',
  templateUrl: './notification.html',
  styleUrls: ['./notification.scss'],
  inputs: ['appearance', 'status', 'shape', 'hasClose', 'hasIcon', 'icon'],
  outputs: ['close'],
  host: {
    role: 'alert',
  },
  standalone: true,
  animations: [FadeInOut(200, 300, true)],
  imports: [NgIf, NgxContentOutlet, SupIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupNotificationComponent extends NotificationMixin {
  @HostBinding('attr.data-status')
  status = this.options.status;

  @HostBinding('class.has-close')
  get hasClose(): boolean {
    return this._hasClose;
  }

  set hasClose(value: SupImplicitBoolean) {
    this._hasClose = supCoerceBooleanProperty(value);
  }

  @HostBinding('class.has-icon')
  hasIcon = this.options.hasIcon;

  override appearance = this.options.appearance;

  override shape = this.options.shape;

  @HostBinding('@fadeInOut')
  animated = true;

  icon: ReflectiveContent;

  get statusIcon(): string {
    return STATUS_ICON[this.status];
  }

  private _hasClose = this.options.hasClose;

  constructor(
    @Inject(SUP_NOTIFICATION_OPTIONS)
    private readonly options: SupNotificationOptions,
    @Inject(ElementRef) elementRef: ElementRef
  ) {
    super(elementRef);
  }
}
