import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { DialogComponentExampleComponent } from './dialog-component-example.component';

import * as typescript from '!!raw-loader!./dialog-component-example.component.ts';
import * as css from '!!raw-loader!./dialog-component-example.component.scss';
import * as html from '!!raw-loader!./dialog-component-example.component.html';

@Component({
  selector: 'app-dialog-component-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponentDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: DialogComponentExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
