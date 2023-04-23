import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { DateTime } from 'luxon';
import { SUP_CALENDAR_OPTIONS, CalendarOptions } from './calendar-options';
import { supIsNumber, supIsString, toPx } from '@supply/cdk';
import { CalendarPaginationComponent } from '@supply/uikit/components/calendar-pagination';
import { SupCalendarGridComponent } from '@supply/uikit/components/calendar-grid';
import { YearsListComponent } from '@supply/uikit/components/years-list';
import { NgIf } from '@angular/common';

@Component({
  selector: 'sup-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CalendarPaginationComponent,
    SupCalendarGridComponent,
    YearsListComponent,
    NgIf,
  ],
})
export class SupCalendarComponent {
  @Input()
  weekdayLength = this.options.weekdayLength;

  @Input()
  monthLength = this.options.monthLength;

  @Input()
  showAdjacent = this.options.showAdjacent;

  @Input()
  @HostBinding(`style.width`)
  get calendarWidth(): string | number {
    return this.panelWidth;
  }

  set calendarWidth(value: number | string) {
    if (supIsString(value)) {
      this.panelWidth = value;
    }

    if (supIsNumber(value)) {
      this.panelWidth = toPx(value);
    }
  }

  @Input()
  month: DateTime = DateTime.local();

  @Output()
  readonly dayClick = new EventEmitter<DateTime>();

  @Output()
  readonly monthChange = new EventEmitter<DateTime>();

  @Input()
  set value(value: DateTime | null) {
    this._value = value;

    if (this.showAdjacent && value instanceof DateTime) {
      this.month = value;
    }
  }

  get value(): DateTime | null {
    return this._value;
  }

  year: number | null = null;

  private panelWidth = `100%`;

  private _value: DateTime | null = null;

  constructor(
    @Inject(SUP_CALENDAR_OPTIONS) private readonly options: CalendarOptions,
    @Inject(ChangeDetectorRef)
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  onDayClick(day: DateTime): void {
    this.dayClick.emit(day);
  }

  onMonthChange(month: DateTime): void {
    this.updateViewedMonth(month);
  }

  onYearChange(year: number): void {
    this.updateViewedMonth(
      DateTime.fromObject({ year, month: this.month.month })
    );
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
