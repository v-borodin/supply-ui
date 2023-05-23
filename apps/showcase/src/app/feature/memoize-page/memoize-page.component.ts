import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-memoize-page',
  templateUrl: './memoize-page.component.html',
  styleUrls: ['./memoize-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoizePageComponent {}
