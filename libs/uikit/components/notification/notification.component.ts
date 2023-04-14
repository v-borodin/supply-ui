import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Input,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { SupAbstractElement, supMixinClose, supMixinShape } from '@supply/cdk';
import {
  SupNotificationOptions,
  SUP_NOTIFICATION_OPTIONS,
} from './notification.helpers';

const NotificationMixin = supMixinClose(supMixinShape(SupAbstractElement));

@Component({
  selector: 'sup-notification',
  templateUrl: './notification.html',
  styleUrls: ['./notification.scss'],
  // eslint-disable-next-line @angular-eslint/no-output-native
  outputs: ['close'],
  host: {
    role: 'alert',
  },
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupNotificationComponent extends NotificationMixin {
  @Input()
  @HostBinding('attr.status')
  status = this.options.status;

  @Input()
  hasClose = this.options.hasClose;

  @Input()
  hasIcon = this.options.hasIcon;

  @Input()
  override shape = this.options.shape;

  constructor(
    @Inject(SUP_NOTIFICATION_OPTIONS)
    private readonly options: SupNotificationOptions
  ) {
    super();
  }
}
