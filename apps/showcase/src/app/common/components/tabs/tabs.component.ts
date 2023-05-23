import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, QueryList } from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { EMPTY_QUERY } from '../../constants/query-list';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  inputs: ['activeTab'],
  outputs: ['activeTabChange'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  @ContentChildren(TabComponent, { descendants: true })
  readonly tabs: QueryList<TabComponent> = EMPTY_QUERY;

  activeTab = 0;

  activeTabChange = new EventEmitter<number>();

  get active(): TabComponent | null {
    return this.tabs.get(this.activeTab) ?? null;
  }

  onClick(tabIndex: number) {
    this.activeTab = tabIndex;
    this.activeTabChange.emit(tabIndex);
  }
}
