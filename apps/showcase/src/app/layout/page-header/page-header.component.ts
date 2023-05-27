import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { GITHUB_PATH_URL } from '../../core/tokens/github-path-url';

@Component({
  selector: 'header[appPageHeader]',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  @Input()
  url: string | null = inject(GITHUB_PATH_URL, { optional: true });
}
