import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { DateTime } from 'luxon';
import { SUP_CALENDAR_OPTIONS, CalendarHelpers } from './calendar.helpers';

@Component({
  selector: 'sup-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupCalendarComponent {
  @Input()
  weekdayLength = this.options.weekdayLength;

  @Input()
  monthLength = this.options.monthLength;

  @Input()
  showAdjacent = this.options.showAdjacent;

  @Input()
  month: DateTime = DateTime.local();

  @Output()
  readonly dayClick = new EventEmitter<DateTime>();

  @Output()
  readonly monthChange = new EventEmitter<DateTime>();

  @Input()
  set value(value: string | null) {
    this._value = value ? DateTime.fromISO(value) : null;

    if (this.showAdjacent && this._value) {
      this.month = this._value;
    }
  }

  get computedValue(): DateTime | null {
    return this._value;
  }

  year: number | null = null;

  private _value: DateTime | null = null;

  constructor(
    @Inject(SUP_CALENDAR_OPTIONS) private readonly options: CalendarHelpers,
    @Inject(ChangeDetectorRef)
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  onDayClick(day: DateTime): void {
    this.dayClick.emit(day);
  }

  onMonthChange(month: DateTime): void {
    this.updateViewedMonth(month);
  }

  onYearChange(year: number): void {
    this.updateViewedMonth(DateTime.fromObject({ year, month: this.month.month }));
    this.year = null;
  }

  showYears(initYear: number): void {
    this.year = initYear;
  }

  private updateViewedMonth(month: DateTime): void {
    if (this.month.hasSame(month, `month`)) {
      return;
    }

    this.month = month;
    this.monthChange.emit(month);
  }
}
