import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupButtonComponent } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-button-states',
  imports: [SupButtonComponent],
  templateUrl: './button-states-example.component.html',
  styleUrls: ['./button-states-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonStatesExampleComponent {}
