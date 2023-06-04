import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { BasicTabsExampleComponent } from './basic-tabs-example.component';

import * as typescript from '!!raw-loader!./basic-tabs-example.component.ts';
import * as css from '!!raw-loader!./basic-tabs-example.component.scss';
import * as html from '!!raw-loader!./basic-tabs-example.component.html';

@Component({
  selector: 'app-basic-tabs-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTabsDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: BasicTabsExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
