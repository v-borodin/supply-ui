import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractPage } from '../../common/abstract/abstract-page';

@Component({
  selector: 'div[appPage]',
  exportAs: 'appPage',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent extends AbstractPage {}
