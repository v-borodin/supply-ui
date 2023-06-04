import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { TextFieldStatesExampleComponent } from './text-field-states-example.component';

import * as typescript from '!!raw-loader!./text-field-states-example.component.ts';
import * as css from '!!raw-loader!./text-field-states-example.component.scss';
import * as html from '!!raw-loader!./text-field-states-example.component.html';

@Component({
  selector: 'app-text-field-states-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldStatesDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: TextFieldStatesExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
