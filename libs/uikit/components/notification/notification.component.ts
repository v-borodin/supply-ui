import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { supMixinClose, supMixinShape } from '@supply/cdk';
import { SupNotificationOptions, SUP_NOTIFICATION_OPTIONS } from './notification.helpers';
import { ReflectiveContent } from '@coreteq/ngx-projection';

const NotificationMixin = supMixinClose(
  supMixinShape(
    class {
      constructor(readonly element: Element) {}
    }
  )
);

@Component({
  selector: 'sup-notification',
  templateUrl: './notification.html',
  styleUrls: ['./notification.scss'],
  inputs: ['status', 'shape', 'hasClose', 'hasIcon', 'icon'],
  outputs: ['close'],
  host: {
    role: 'alert',
  },
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupNotificationComponent extends NotificationMixin {
  @HostBinding('attr.data-status')
  status = this.options.status;

  override shape = this.options.shape;

  hasClose = this.options.hasClose;

  hasIcon = this.options.hasIcon;

  icon: ReflectiveContent;

  constructor(
    @Inject(SUP_NOTIFICATION_OPTIONS)
    private readonly options: SupNotificationOptions,
    @Inject(ElementRef) { nativeElement }: ElementRef
  ) {
    super(nativeElement);
  }
}
