import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';
import {
  fromTheEndOfMonth,
  fromTheStartOfMonth,
  getFirstWeekdayOfMonth,
  getLastWeekdayOfMonth,
  getNextMonth,
  getPreviousMonth,
} from './utils';

const CALENDAR_SIZE = 42;

const DAYS_PER_WEEK = 7;

@Pipe({
  name: 'calendarGrid',
  standalone: true,
})
export class SupCalendarGridPipe implements PipeTransform {
  transform(month: DateTime, showAdjacent = true): Readonly<DateTime[]> {
    const dateArray = [];

    for (let i = 1; i <= month.daysInMonth!; i++) {
      dateArray.push(month.set({ day: i }));
    }

    if (!showAdjacent) {
      return dateArray;
    }

    const firstWeekday = getFirstWeekdayOfMonth(month);

    for (let i = 0; i < firstWeekday - 1; i++) {
      dateArray.unshift(
        fromTheEndOfMonth(getPreviousMonth(month)).minus({ day: i })
      );
    }

    const afterLastWeekday = DAYS_PER_WEEK - getLastWeekdayOfMonth(month);

    for (let i = 0; i < afterLastWeekday; i++) {
      dateArray.push(fromTheStartOfMonth(getNextMonth(month)).plus({ day: i }));
    }

    // const totalDays = dateArray.length;
    // const daysToFill = CALENDAR_SIZE - totalDays;
    // const lastAdded = dateArray[totalDays - 1];
    //
    // // for (let i = 0; i < daysToFill; i++) {
    // //   dateArray.push(
    // //     fromTheStartOfMonth(getNextMonth(month)).plus({
    // //       day: afterLastWeekday ? lastAdded.day + i : i,
    // //     })
    // //   );
    // // }

    return dateArray;
  }
}
