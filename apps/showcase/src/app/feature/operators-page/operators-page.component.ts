import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-operators-page',
  templateUrl: './operators-page.component.html',
  styleUrls: ['./operators-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorsPageComponent {}
