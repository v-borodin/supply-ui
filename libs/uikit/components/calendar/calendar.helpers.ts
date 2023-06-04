import { InjectionToken } from '@angular/core';
import { StringUnitLength, UnitLength } from 'luxon';

export interface CalendarHelpers {
  weekdayLength: StringUnitLength;

  monthLength: UnitLength;

  showAdjacent: boolean;

  calendarPanelClass?: string | string[];

  align: 'left' | 'right';
}

const DEFAULT_OPTIONS: CalendarHelpers = {
  weekdayLength: 'short',

  monthLength: 'long',

  showAdjacent: true,

  align: 'left',
};

export const SUP_CALENDAR_OPTIONS = new InjectionToken<CalendarHelpers>(
  `@calendar:DEFAULT_OPTIONS`,
  {
    factory: () => DEFAULT_OPTIONS,
  },
);
