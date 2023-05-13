import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

export enum SupSortDirection {
  Ascending = 1,

  Descending = -1,
}

@Component({
  selector: 'table[supTable]',
  exportAs: 'supTable',
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
  host: {
    style: 'border-collapse: separate',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupTableComponent<T> implements AfterViewInit {
  @Input()
  direction: SupSortDirection | null = null;

  @Input()
  sorter: T | null = null;

  @Output()
  readonly directionChange = new EventEmitter<SupSortDirection>();

  @Output()
  readonly sorterChange = new EventEmitter<T | null>();

  private readonly changeDetectionRef = inject(ChangeDetectorRef);

  readonly change$ = new Subject<void>();

  ngAfterViewInit() {
    this.changeDetectionRef.detectChanges();
  }

  updateSorterAndDirection(sorter: T | null): void {
    if (this.sorter === sorter) {
      this.changeDirection(this.direction === 1 ? -1 : 1);
    } else {
      this.changeSorter(sorter);
      this.changeDirection(1);
    }
  }

  changeSorter(sorter: T | null): void {
    this.sorter = sorter;
    this.sorterChange.emit(this.sorter);
    this.change$.next();
  }

  changeDirection(direction: SupSortDirection): void {
    this.direction = direction;
    this.directionChange.emit(this.direction);
    this.change$.next();
  }
}
