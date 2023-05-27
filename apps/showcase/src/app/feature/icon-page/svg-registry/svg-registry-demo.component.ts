import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { SvgRegistryExampleComponent } from './svg-registry-example.component';

import * as typescript from '!!raw-loader!./svg-registry-example.component.ts';
import * as css from '!!raw-loader!./svg-registry-example.component.scss';
import * as html from '!!raw-loader!./svg-registry-example.component.html';

@Component({
  selector: 'app-svg-registry-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgRegistryDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: SvgRegistryExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
