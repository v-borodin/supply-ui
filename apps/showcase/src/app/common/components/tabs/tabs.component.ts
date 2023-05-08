import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { EMPTY_QUERY } from '../../constants/query-list';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  @ContentChildren(TabComponent, { descendants: true })
  readonly tabs: QueryList<TabComponent> = EMPTY_QUERY;

  @Input()
  activeTab = 0;

  @Output()
  activeTabChange = new EventEmitter<number>();

  get active(): TabComponent | null {
    return this.tabs.get(this.activeTab) ?? null;
  }

  onClick(tab: number) {
    this.activeTab = tab;
    this.activeTabChange.emit(tab);
  }
}
