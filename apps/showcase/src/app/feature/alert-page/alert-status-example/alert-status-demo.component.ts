import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { AlertStatusExampleComponent } from './alert-status-example.component';

import * as typescript from '!!raw-loader!./alert-status-example.component.ts';
import * as css from '!!raw-loader!./alert-status-example.component.scss';
import * as html from '!!raw-loader!./alert-status-example.component.html';

@Component({
  selector: 'app-alert-status-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertStatusDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: AlertStatusExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
