import { DateTime } from 'luxon';

export const supIsWeekend = (day: DateTime) =>
  day.weekday === 6 || day.weekday === 7;

export const supIsAdjacent = (month: DateTime, day: DateTime) =>
  !month.hasSame(day, `month`);

export const supIsTheSameDate = (first: DateTime, second: DateTime) =>
  first.toMillis() === second.toMillis();

export const supIsPreviousMonthDay = (relativeTo: DateTime, day: DateTime) =>
  day.month < relativeTo.month || day.year < relativeTo.year;

export const supIsNextMonthDay = (relativeTo: DateTime, day: DateTime) =>
  day.month > relativeTo.month || day.year > relativeTo.year;

export const supIsDifferentMonth = (current: DateTime, relativeTo: DateTime) =>
  current.month !== relativeTo.month || current.year !== relativeTo.year;
