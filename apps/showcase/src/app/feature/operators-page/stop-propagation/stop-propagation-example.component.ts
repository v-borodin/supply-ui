import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-stop-propagation-example',
  templateUrl: './stop-propagation-example.component.html',
  styleUrls: ['./stop-propagation-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopPropagationExampleComponent {}
