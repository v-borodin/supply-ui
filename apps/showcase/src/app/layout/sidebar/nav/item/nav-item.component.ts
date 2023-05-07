import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { NavGroupComponent } from '../group/nav-group.component';
import { EMPTY_QUERY } from '../nav.component';
import {
  NAV_DIVIDER,
  NavDividerDirective,
} from '../divider/nav-divider.directive';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  inputs: ['icon', 'disabled', 'routerLink'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
  @ViewChild(TemplateRef, { static: true, read: TemplateRef })
  readonly template: TemplateRef<any> | null = null;

  @ContentChildren(NavGroupComponent, { descendants: false })
  readonly groups: QueryList<NavGroupComponent> = EMPTY_QUERY;

  @ContentChild(NAV_DIVIDER, { descendants: true })
  readonly divider: NavDividerDirective | null = null;

  icon: ReflectiveContent;

  disabled = false;

  routerLink?: string;
}
