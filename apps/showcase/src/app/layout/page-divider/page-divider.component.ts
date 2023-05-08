import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hr[appPageDivider]',
  templateUrl: './page-divider.component.html',
  styleUrls: ['./page-divider.component.scss'],
  host: {
    class: 'sup-divider',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageDividerComponent {}
