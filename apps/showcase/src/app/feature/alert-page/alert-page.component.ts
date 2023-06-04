import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
  styleUrls: ['./alert-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPageComponent {}
