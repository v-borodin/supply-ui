import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { DatePickerBasicExampleComponent } from './date-picker-basic-example.component';

import * as typescript from '!!raw-loader!./date-picker-basic-example.component.ts';
import * as css from '!!raw-loader!./date-picker-basic-example.component.scss';
import * as html from '!!raw-loader!./date-picker-basic-example.component.html';

@Component({
  selector: 'app-date-picker-basic-demo',
  template: '<app-demo [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerBasicDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: DatePickerBasicExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
