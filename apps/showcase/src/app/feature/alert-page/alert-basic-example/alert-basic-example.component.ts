import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { SupAlertService, SupTextFieldComponent } from '@supply/uikit';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-alert-basic-example',
  templateUrl: './alert-basic-example.component.html',
  styleUrls: ['./alert-basic-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBasicExampleComponent {
  @ViewChild('field')
  private readonly field?: SupTextFieldComponent;

  readonly control = new FormControl('', {
    validators: Validators.required,
    nonNullable: true,
  });

  constructor(@Inject(SupAlertService) private alert: SupAlertService) {}

  push(message: string): void {
    if (this.control.invalid) {
      this.field?.focusField();
      return;
    }

    this.alert.push(message, {
      status: 'success',
    });

    this.control.reset();
  }
}
