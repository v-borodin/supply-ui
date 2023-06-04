import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { AlertBasicExampleComponent } from './alert-basic-example.component';

import * as typescript from '!!raw-loader!./alert-basic-example.component.ts';
import * as css from '!!raw-loader!./alert-basic-example.component.scss';
import * as html from '!!raw-loader!./alert-basic-example.component.html';

@Component({
  selector: 'app-alert-basic-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBasicDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: AlertBasicExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
