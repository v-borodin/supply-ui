import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { TextFieldBasicExampleComponent } from './text-field-basic-example.component';

import * as typescript from '!!raw-loader!./text-field-basic-example.component.ts';
import * as css from '!!raw-loader!./text-field-basic-example.component.scss';
import * as html from '!!raw-loader!./text-field-basic-example.component.html';

@Component({
  selector: 'app-text-field-basic-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldBasicDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: TextFieldBasicExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
