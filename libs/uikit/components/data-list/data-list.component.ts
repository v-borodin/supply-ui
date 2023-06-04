import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  forwardRef,
  HostBinding,
  Input,
  QueryList,
} from '@angular/core';
import { SupOptionComponent } from './option.component';

@Component({
  selector: 'sup-data-list',
  templateUrl: './data-list.html',
  styleUrls: ['./data-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupDataListComponent<TValue> {
  @ContentChildren(forwardRef(() => SupOptionComponent), { descendants: true })
  private readonly options: QueryList<SupOptionComponent<TValue>> = new QueryList();

  @Input()
  @HostBinding('attr.role')
  role = 'listbox';
}
