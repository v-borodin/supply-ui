import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SUP_ALERT_LIST, SupAlert } from '../alert.helpers';
import { Observable } from 'rxjs';

@Component({
  selector: 'sup-alert-host',
  templateUrl: './alert-host.html',
  styleUrls: ['./alert-host.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupAlertHostComponent {
  constructor(@Inject(SUP_ALERT_LIST) readonly alerts$: Observable<SupAlert[]>) {}
}
