import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-notification-status-example',
  templateUrl: './notification-status-example.component.html',
  styleUrls: ['./notification-status-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationStatusExampleComponent {}
