import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { DropdownTemplateExampleComponent } from './dropdown-template-example.component';

import * as typescript from '!!raw-loader!./dropdown-template-example.component.ts';
import * as css from '!!raw-loader!./dropdown-template-example.component.scss';
import * as html from '!!raw-loader!./dropdown-template-example.component.html';

@Component({
  selector: 'app-dropdown-template-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownTemplateDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: DropdownTemplateExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
