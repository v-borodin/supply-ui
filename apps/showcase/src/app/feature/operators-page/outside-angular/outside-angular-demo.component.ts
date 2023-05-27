import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { OutsideAngularExampleComponent } from './outside-angular-example.component';

import * as typescript from '!!raw-loader!./outside-angular-example.component.ts';
import * as css from '!!raw-loader!./outside-angular-example.component.scss';
import * as html from '!!raw-loader!./outside-angular-example.component.html';

@Component({
  selector: 'app-outside-angular-demo',
  template: '<app-demo [activeTab]="1" [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutsideAngularDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: OutsideAngularExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
