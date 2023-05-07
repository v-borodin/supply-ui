import { ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { NavItemComponent } from './item/nav-item.component';

export const EMPTY_QUERY = new QueryList<any>();

@Component({
  selector: 'nav[appNav]',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  @ContentChildren(NavItemComponent, { descendants: false })
  readonly items: QueryList<NavItemComponent> = EMPTY_QUERY;

  click(item: NavItemComponent): void {
    if (item.disabled) {
      return;
    }
  }
}
