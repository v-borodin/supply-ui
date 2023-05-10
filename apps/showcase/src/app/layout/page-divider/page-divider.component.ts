import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hr[appPageDivider]',
  template: '',
  styleUrls: ['./page-divider.component.scss'],
  host: {
    class: 'sup-divider',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageDividerComponent {}
