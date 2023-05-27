import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupButtonComponent } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-button-size-shape',
  imports: [SupButtonComponent],
  templateUrl: './button-size-shape-example.component.html',
  styleUrls: ['./button-size-shape-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSizeShapeExampleComponent {}
