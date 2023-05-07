import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-button-size-shape',
  templateUrl: './button-size-shape-example.component.html',
  styleUrls: ['./button-size-shape-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSizeShapeExampleComponent {}
