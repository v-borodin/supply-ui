import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { StopPropagationExampleComponent } from './stop-propagation-example.component';

import * as typescript from '!!raw-loader!./stop-propagation-example.component.ts';
import * as css from '!!raw-loader!./stop-propagation-example.component.scss';
import * as html from '!!raw-loader!./stop-propagation-example.component.html';

@Component({
  selector: 'app-stop-propagation-demo',
  template: '<app-demo [activeTab]="1" [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopPropagationDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: StopPropagationExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
