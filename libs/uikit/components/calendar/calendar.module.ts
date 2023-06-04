import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { CalendarPaginationComponent } from '@supply/uikit/components/calendar-pagination';
import { SupCalendarGridComponent } from '@supply/uikit/components/calendar-grid';
import { SupYearsListComponent } from '@supply/uikit/components/years-list';
import { SupCalendarComponent } from './calendar.component';

@NgModule({
  declarations: [SupCalendarComponent],
  imports: [
    CalendarPaginationComponent,
    SupCalendarGridComponent,
    SupYearsListComponent,
    NgIf,
  ],
  exports: [SupCalendarComponent],
})
export class SupCalendarModule {}
