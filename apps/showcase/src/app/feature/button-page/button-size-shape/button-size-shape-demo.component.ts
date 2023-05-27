import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { ButtonSizeShapeExampleComponent } from './button-size-shape-example.component.ts';

import * as typescript from '!!raw-loader!./button-size-shape-example.component.ts';
import * as css from '!!raw-loader!./button-size-shape-example.component.scss';
import * as html from '!!raw-loader!./button-size-shape-example.component.html';

@Component({
  selector: 'app-button-size-shape-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSizeShapeDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: ButtonSizeShapeExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
