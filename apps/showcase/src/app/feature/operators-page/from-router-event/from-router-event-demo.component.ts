import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { FromRouterEventExampleComponent } from './from-router-event-example.component';

import * as typescript from '!!raw-loader!./from-router-event-example.component.ts';
import * as css from '!!raw-loader!./from-router-event-example.component.scss';
import * as html from '!!raw-loader!./from-router-event-example.component.html';

@Component({
  selector: 'app-from-router-event-demo',
  template: '<app-demo [activeTab]="1" [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FromRouterEventDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: FromRouterEventExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
