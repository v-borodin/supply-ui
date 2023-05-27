import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { ButtonStatesExampleComponent } from './button-states-example.component';

import * as typescript from '!!raw-loader!./button-states-example.component.ts';
import * as css from '!!raw-loader!./button-states-example.component.scss';
import * as html from '!!raw-loader!./button-states-example.component.html';

@Component({
  selector: 'app-button-states-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonStatesDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: ButtonStatesExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
