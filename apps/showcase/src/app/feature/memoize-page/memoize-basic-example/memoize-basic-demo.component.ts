import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractShowcase } from '../../../common/abstract/abstract-showcase';
import { MemoizeBasicExampleComponent } from './memoize-basic-example.component';

import * as typescript from '!!raw-loader!./memoize-basic-example.component.ts';
import * as css from '!!raw-loader!../memoize-page.component.scss';
import * as html from '!!raw-loader!../memoize-page.component.scss';

@Component({
  selector: 'app-memoize-basic-demo',
  template: '<app-demo [activeTab]="1" [example]="example"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoizeBasicDemoComponent extends AbstractShowcase {
  readonly example = {
    Preview: MemoizeBasicExampleComponent,
    HTML: html,
    SCSS: css,
    TypeScript: typescript,
  };
}
