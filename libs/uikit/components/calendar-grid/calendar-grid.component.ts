import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgForOf, TitleCasePipe } from '@angular/common';
import { supIsAdjacent, supIsTheSameDate, supIsToday, supIsWeekend } from '@supply/cdk';
import { DateTime, Info, StringUnitLength } from 'luxon';
import { SupCalendarGridPipe } from '@supply/uikit/pipes';

@Component({
  selector: 'sup-calendar-grid',
  standalone: true,
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],
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
      locale: 'sk',
    });
  }

  isToday(day: DateTime): boolean {
    return supIsToday(day);
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
