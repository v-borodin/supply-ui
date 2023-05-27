import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationPageComponent {}
