import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { DefaultTableExampleComponent } from './default-table-example.component';

import * as typescript from '!!raw-loader!./default-table-example.component.ts';
import * as css from '!!raw-loader!./default-table-example.component.scss';
import * as html from '!!raw-loader!./default-table-example.component.html';

@Component({
  selector: 'app-default-table-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultTableDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: DefaultTableExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
