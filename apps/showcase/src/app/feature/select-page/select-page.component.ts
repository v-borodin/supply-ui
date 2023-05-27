import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-select-page',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent {}
