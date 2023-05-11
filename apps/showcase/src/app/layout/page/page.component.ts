import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractPage } from '../../common/abstract/abstract-page';
import { GITHUB_PATH_URL } from '../../core/tokens/github-path-url';

@Component({
  selector: 'div[appPage]',
  exportAs: 'appPage',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent extends AbstractPage {
  readonly githubUrl = inject(GITHUB_PATH_URL, { optional: true });
}
