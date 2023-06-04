import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupButtonComponent, SupTooltipModule } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-tooltip-basic-example',
  templateUrl: './tooltip-basic-example.component.html',
  styleUrls: ['./tooltip-basic-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SupButtonComponent, SupTooltipModule],
})
export class TooltipBasicExampleComponent {}
