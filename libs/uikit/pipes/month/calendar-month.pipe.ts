import { Pipe, PipeTransform } from '@angular/core';
import { DateTime, Info, UnitLength } from 'luxon';

@Pipe({
  name: 'supMonth',
  standalone: true,
})
export class SupCalendarMonthPipe implements PipeTransform {
  transform(value: DateTime, length?: UnitLength): string {
    const lengthOfMonth = length || 'long';
    const monthIndex = value.month - 1;

    return Info.months(lengthOfMonth, {
      locale: 'en',
    })[monthIndex];
  }
}
