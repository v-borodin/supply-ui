import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { NavGroupComponent } from '../group/nav-group.component';
import { NAV_DIVIDER, NavDividerDirective } from '../divider/nav-divider.directive';
import { supCoerceBooleanProperty, SupImplicitBoolean } from '@supply/cdk';
import { EMPTY_QUERY, getOriginalArray } from '../../../../common/constants/query-list';
import { supMemo } from '@supply/cdk/decorators';

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

  @Input()
  get marked(): boolean {
    return this._marked;
  }

  set marked(value: SupImplicitBoolean) {
    this._marked = supCoerceBooleanProperty(value);
  }

  @Input()
  get showCounter(): boolean {
    return this._showCounter;
  }

  set showCounter(value: SupImplicitBoolean) {
    this._showCounter = supCoerceBooleanProperty(value);
  }

  @supMemo
  get counter(): number {
    return getOriginalArray(this.groups).reduce((acc, curr) => {
      return acc + curr.items.length;
    }, 0);
  }

  icon: ReflectiveContent;

  disabled = false;

  routerLink?: string;

  private _marked = false;

  private _showCounter = false;
}
