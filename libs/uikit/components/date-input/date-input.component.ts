import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable, skipWhile, tap } from 'rxjs';
import {
  runOutsideAngular,
  SupClickOutsideHandler,
  SupFieldSimpleDirective,
  supIsLuxonDate,
  supIsNativeDate,
  supIsString,
} from '@supply/cdk';
import { DateTime } from 'luxon';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { SupIconComponent } from '@supply/uikit/components/icon';
import { SupCalendarComponent } from '@supply/uikit/components';

@Component({
  selector: 'sup-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [SupClickOutsideHandler],
  standalone: true,
  imports: [AsyncPipe, NgIf, DatePipe, SupIconComponent, SupCalendarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupDateInputComponent
  extends SupFieldSimpleDirective
  implements ControlValueAccessor
{
  @Input()
  disabled = false;

  @Input()
  closeAfterSelect = true;

  @Input()
  dateFormat = `dd. MM. YYYY`;

  @Input()
  size = `medium`;

  @Input()
  withOverlap = false;

  @Input()
  align = `left`;

  @Input()
  calendarWidth: number | string = `100%`;

  clickOutside$: Observable<Event>;

  dropped = false;

  @Input()
  set value(newValue: DateTime | null) {
    const hasAssigned = this.assignValue(newValue);
    if (hasAssigned) {
      this.onChange(newValue?.toISODate());
    }
  }

  get value(): DateTime | null {
    return this.innerValue;
  }

  private innerValue: DateTime | null = null;

  constructor(
    @Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef,
    @Inject(SupClickOutsideHandler) clickOutside$: Observable<Event>
  ) {
    super(true);
    this.clickOutside$ = runOutsideAngular(
      clickOutside$.pipe(
        skipWhile(() => !this.dropped),
        tap(() => this.forceClose())
      )
    );
  }

  writeValue(value: DateTime | Date | string): void {
    if (value == null) {
      const hasAssigned = this.assignValue(value);
      if (hasAssigned) {
        this.changeDetector.markForCheck();
      }
      return;
    }

    let luxonDate = null;

    if (supIsString(value)) {
      luxonDate = DateTime.fromISO(value);
    }

    if (supIsNativeDate(value)) {
      luxonDate = DateTime.fromJSDate(value);
    }

    if (supIsLuxonDate(value)) {
      luxonDate = value;
    }

    this.assignValue(luxonDate);
  }

  toggleDropdown(): void {
    if (this.disabled) {
      return;
    }
    this.dropped = !this.dropped;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDayChange(day: DateTime): void {
    this.value = day;

    if (this.closeAfterSelect) {
      this.forceClose();
    }
  }

  private onChange: (value: any) => void = () => {};

  private onTouched: any = () => {};

  private forceClose(): void {
    this.dropped = false;
    this.changeDetector.markForCheck();
  }

  private assignValue(newValue: DateTime | null): boolean {
    if (newValue !== this.innerValue) {
      this.innerValue = newValue;
      return true;
    }
    return false;
  }
}
