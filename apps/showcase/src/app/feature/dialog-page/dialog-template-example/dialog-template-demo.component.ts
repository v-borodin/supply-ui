import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { DialogTemplateExampleComponent } from './dialog-template-example.component';

import * as typescript from '!!raw-loader!./dialog-template-example.component.ts';
import * as css from '!!raw-loader!./dialog-template-example.component.scss';
import * as html from '!!raw-loader!./dialog-template-example.component.html';

@Component({
  selector: 'app-dialog-template-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTemplateDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: DialogTemplateExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
