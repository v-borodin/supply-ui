import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { DefaultButtonExampleComponent } from './default-button-example.component.ts';

import * as typescript from '!!raw-loader!./default-button-example.component.ts';
import * as css from '!!raw-loader!./default-button-example.component.scss';
import * as html from '!!raw-loader!./default-button-example.component.html';

@Component({
  selector: 'app-default-button-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultButtonDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: DefaultButtonExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
