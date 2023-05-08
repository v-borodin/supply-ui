import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { ButtonCustomizationExampleComponent } from './button-customization-example.component';

import * as typescript from '!!raw-loader!./button-customization-example.component.ts';
import * as css from '!!raw-loader!./button-customization-example.component.scss';
import * as html from '!!raw-loader!./button-customization-example.component.html';

@Component({
  selector: 'app-button-customization-demo',
  template: '<app-demo [activeTab]="0" [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonCustomizationDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: ButtonCustomizationExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
