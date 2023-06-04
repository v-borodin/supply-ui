import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { SupAlertService, SupTextFieldComponent } from '@supply/uikit';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-picker-basic-example',
  templateUrl: './date-picker-basic-example.component.html',
  styleUrls: ['./date-picker-basic-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerBasicExampleComponent {
  constructor(@Inject(SupAlertService) private alert: SupAlertService) {}

  push(message: string): void {}
}
