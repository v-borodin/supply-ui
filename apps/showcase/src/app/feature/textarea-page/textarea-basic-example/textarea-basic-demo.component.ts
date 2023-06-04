import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { TextareaBasicExampleComponent } from './textarea-basic-example.component';

import * as typescript from '!!raw-loader!./textarea-basic-example.component.ts';
import * as css from '!!raw-loader!./textarea-basic-example.component.scss';
import * as html from '!!raw-loader!./textarea-basic-example.component.html';

@Component({
  selector: 'app-textarea-basic-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaBasicDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: TextareaBasicExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
