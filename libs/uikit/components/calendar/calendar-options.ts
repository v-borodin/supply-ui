import { InjectionToken } from '@angular/core';
import { StringUnitLength, UnitLength } from 'luxon';

export interface CalendarOptions {
  weekdayLength: StringUnitLength;

  monthLength: UnitLength;

  showAdjacent: boolean;

  calendarPanelClass?: string | string[];

  align: 'left' | 'right';
}

const DEFAULT_OPTIONS: CalendarOptions = {
  weekdayLength: 'short',
  monthLength: 'long',
  showAdjacent: true,
  align: 'left',
};

export const SUP_CALENDAR_OPTIONS = new InjectionToken<CalendarOptions>(
  `@calendar:DEFAULT_OPTIONS`,
  {
    factory: () => DEFAULT_OPTIONS,
  }
);
