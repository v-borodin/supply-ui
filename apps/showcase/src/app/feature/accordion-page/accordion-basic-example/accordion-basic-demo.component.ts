import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { AccordionBasicExampleComponent } from './accordion-basic-example.component';

import * as typescript from '!!raw-loader!./accordion-basic-example.component.ts';
import * as css from '!!raw-loader!./accordion-basic-example.component.scss';
import * as html from '!!raw-loader!./accordion-basic-example.component.html';

@Component({
  selector: 'app-accordion-basic-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionBasicDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: AccordionBasicExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
