import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'header[appHeader]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    id: 'header',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
