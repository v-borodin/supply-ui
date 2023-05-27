import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupNotificationComponent } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-notification-status-example',
  imports: [SupNotificationComponent], // <-- add this
  templateUrl: './notification-status-example.component.html',
  styleUrls: ['./notification-status-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationStatusExampleComponent {}
