import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs-page.component.html',
  styleUrls: ['./tabs-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPageComponent {}
