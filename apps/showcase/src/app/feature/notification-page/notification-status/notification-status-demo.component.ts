import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { NotificationStatusExampleComponent } from './notification-status-example.component';

import * as typescript from '!!raw-loader!./notification-status-example.component.ts';
import * as css from '!!raw-loader!./notification-status-example.component.scss';
import * as html from '!!raw-loader!./notification-status-example.component.html';

@Component({
  selector: 'app-notification-status-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationStatusDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: NotificationStatusExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
