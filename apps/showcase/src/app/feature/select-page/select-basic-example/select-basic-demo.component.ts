import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { SelectBasicExampleComponent } from './select-basic-example.component';

import * as typescript from '!!raw-loader!./select-basic-example.component.ts';
import * as css from '!!raw-loader!./select-basic-example.component.scss';
import * as html from '!!raw-loader!./select-basic-example.component.html';

@Component({
  selector: 'app-select-basic-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBasicDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: SelectBasicExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
