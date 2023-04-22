import { DateTime } from 'luxon';

export const getFirstWeekdayOfMonth = (month: DateTime) =>
  month.startOf(`month`).weekday;

export const getLastWeekdayOfMonth = (month: DateTime) =>
  month.endOf(`month`).weekday;

export const getPreviousMonth = (month: DateTime) => month.minus({ month: 1 });

export const getNextMonth = (month: DateTime) => month.plus({ month: 1 });

export const fromTheStartOfMonth = (month: DateTime) => month.startOf(`month`);

export const fromTheEndOfMonth = (month: DateTime) => month.endOf(`month`);
