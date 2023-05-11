import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'main[appMain]',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  host: {
    role: 'main',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
