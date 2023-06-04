import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SupAlertService } from '@supply/uikit';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-alert-status-example',
  templateUrl: './alert-status-example.component.html',
  styleUrls: ['./alert-status-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertStatusExampleComponent {
  readonly control = new FormControl<any>('info', {
    validators: Validators.required,
    nonNullable: true,
  });

  constructor(@Inject(SupAlertService) private alert: SupAlertService) {}

  push(): void {
    this.alert.push('Status example', {
      status: this.control.value,
    });
  }
}
