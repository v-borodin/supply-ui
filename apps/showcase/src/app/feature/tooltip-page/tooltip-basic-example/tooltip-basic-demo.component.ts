import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { TooltipBasicExampleComponent } from './tooltip-basic-example.component';

import * as typescript from '!!raw-loader!./tooltip-basic-example.component.ts';
import * as css from '!!raw-loader!./tooltip-basic-example.component.scss';
import * as html from '!!raw-loader!./tooltip-basic-example.component.html';

@Component({
  selector: 'app-tooltip-basic-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipBasicDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: TooltipBasicExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
