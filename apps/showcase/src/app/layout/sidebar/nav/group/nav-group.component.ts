import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { NavItemComponent } from '../item/nav-item.component';
import { EMPTY_QUERY } from '../nav.component';

@Component({
  selector: 'app-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavGroupComponent {
  @ContentChildren(NavItemComponent, { descendants: false })
  readonly items: QueryList<NavItemComponent> = EMPTY_QUERY;

  constructor(@Attribute('label') readonly label: string) {}
}
