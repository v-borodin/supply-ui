import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-date-picker-page',
  templateUrl: './date-picker-page.component.html',
  styleUrls: ['./date-picker-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerPageComponent {}
