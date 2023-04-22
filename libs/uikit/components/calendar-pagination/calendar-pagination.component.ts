import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DateTime, UnitLength } from 'luxon';
import { SupCalendarMonthPipe } from '../../pipes';
import { TitleCasePipe } from '@angular/common';
import { SupIconComponent } from '@supply/uikit/components/icon';

@Component({
  selector: 'sup-calendar-pagination',
  templateUrl: './calendar-pagination.component.html',
  styleUrls: ['./calendar-pagination.component.scss'],
  standalone: true,
  imports: [SupCalendarMonthPipe, TitleCasePipe, SupIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPaginationComponent {
  @Input()
  value = DateTime.local();

  @Input()
  monthLength: UnitLength = 'long';

  @Output()
  readonly valueChange = new EventEmitter<DateTime>();

  @Output()
  readonly signatureClick = new EventEmitter<number>();

  previous(): void {
    const newValue = this.value.minus({ month: 1 });
    this.updateValue(newValue);
  }

  next(): void {
    const newValue = this.value.plus({ month: 1 });
    this.updateValue(newValue);
  }

  clickDateSignature(year: number, event: Event): void {
    event.stopPropagation();
    this.signatureClick.emit(year);
  }

  private updateValue(value: DateTime): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
