import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupButtonComponent } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-default-button-example',
  imports: [SupButtonComponent], // <--- import this
  templateUrl: './default-button-example.component.html',
  styleUrls: ['./default-button-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultButtonExampleComponent {}
