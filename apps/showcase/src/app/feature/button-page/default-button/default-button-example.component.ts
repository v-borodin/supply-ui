import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-default-button-example',
  templateUrl: './default-button-example.component.html',
  styleUrls: ['./default-button-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultButtonExampleComponent {}
