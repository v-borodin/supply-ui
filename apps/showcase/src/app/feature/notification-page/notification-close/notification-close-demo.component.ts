import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { NotificationCloseExampleComponent } from './notification-close-example.component';

import * as typescript from '!!raw-loader!./notification-close-example.component.ts';
import * as css from '!!raw-loader!./notification-close-example.component.scss';
import * as html from '!!raw-loader!./notification-close-example.component.html';

@Component({
  selector: 'app-notification-close-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCloseDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: NotificationCloseExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
