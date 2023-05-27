import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  Optional,
} from '@angular/core';
import { supCoerceBooleanProperty, SupImplicitBoolean } from '@supply/cdk';
import { SupTableComponent } from '../table.component';

@Component({
  selector: 'th[supTitle]',
  templateUrl: './title.html',
  styleUrls: ['./title.scss'],
  inputs: ['key: supTitle'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupTitleComponent<T extends string> {
  key: T | null = null;

  @HostBinding('class.current-sorter')
  get isCurrentSorter(): boolean {
    return !!this.key && !!this.table && this.key === this.table.sorter;
  }

  @Input()
  set sortable(value: SupImplicitBoolean) {
    this._sortable = supCoerceBooleanProperty(value);
  }

  get sortable(): boolean {
    return this._sortable;
  }

  get icon(): string {
    if (this.isCurrentSorter) {
      return this.table?.direction === 1 ? 'appSortDescending' : 'appSortAscending';
    }

    return 'appArrowDown';
  }

  private _sortable = true;

  constructor(
    @Optional()
    @Inject(forwardRef(() => SupTableComponent))
    readonly table: SupTableComponent<T> | null,
  ) {}
}
