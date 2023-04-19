import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  TemplateRef,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { supMixinClose, supMixinShape } from '@supply/cdk';
import {
  SupNotificationOptions,
  SUP_NOTIFICATION_OPTIONS,
} from './notification.helpers';

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
  override shape = this.options.shape;

  @Input()
  hasClose = this.options.hasClose;

  @Input()
  hasIcon = this.options.hasIcon;

  @Input()
  icon: TemplateRef<any> | null | undefined;

  constructor(
    @Inject(SUP_NOTIFICATION_OPTIONS)
    private readonly options: SupNotificationOptions,
    @Inject(ElementRef) { nativeElement }: ElementRef
  ) {
    super(nativeElement);
  }
}
