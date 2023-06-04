import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { TypeGuardsBasicExampleComponent } from './type-guards-basic-example.component';

import * as typescript from '!!raw-loader!./type-guards-basic-example.component.ts';
import * as css from '!!raw-loader!../type-guards-page.component.scss';
import * as html from '!!raw-loader!../type-guards-page.component.scss';

@Component({
  selector: 'app-type-guards-basic-demo',
  template: '<app-demo [activeTab]="1" [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeGuardsBasicDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: TypeGuardsBasicExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
