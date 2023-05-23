import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DateTime, Info, StringUnitLength } from 'luxon';
import { NgForOf, TitleCasePipe } from '@angular/common';
import { supIsAdjacent, supIsTheSameDate, supIsWeekend } from '@supply/cdk';
import { SupCalendarGridPipe } from '@supply/uikit/pipes';

@Component({
  selector: 'sup-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],
  standalone: true,
  imports: [NgForOf, SupCalendarGridPipe, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupCalendarGridComponent {
  @Input()
  month = DateTime.local();

  @Input()
  value: DateTime | null = null;

  @Input()
  weekdayLength: StringUnitLength = 'short';

  @Input()
  showAdjacent = true;

  @Output()
  readonly dayClick = new EventEmitter<DateTime>();

  weekdays: string[] = [];

  constructor() {
    this.weekdays = Info.weekdays(this.weekdayLength, {
      locale: 'en',
    });
  }

  isPressed(day: DateTime): boolean | null {
    if (!this.value) {
      return null;
    }

    return supIsTheSameDate(this.value, day);
  }

  isAdjacent(day: DateTime): boolean {
    return supIsAdjacent(this.month, day);
  }

  isWeekend(day: DateTime): boolean {
    return supIsWeekend(day);
  }

  trackByFn(index: number, date: DateTime): number {
    return date.toMillis();
  }
}
