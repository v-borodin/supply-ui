import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'header[appPageHeader]',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  @Input()
  url: string | null = null;
}
