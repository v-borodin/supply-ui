import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { PreventDefaultExampleComponent } from './prevent-default-example.component';

import * as typescript from '!!raw-loader!./prevent-default-example.component.ts';
import * as css from '!!raw-loader!./prevent-default-example.component.scss';
import * as html from '!!raw-loader!./prevent-default-example.component.html';

@Component({
  selector: 'app-prevent-default-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreventDefaultDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: PreventDefaultExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
