import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-button-states',
  templateUrl: './button-states-example.component.html',
  styleUrls: ['./button-states-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonStatesExampleComponent {}
