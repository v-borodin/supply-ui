import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupTextFieldModule } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-text-field-states-example',
  imports: [SupTextFieldModule],
  templateUrl: './text-field-states-example.component.html',
  styleUrls: ['./text-field-states-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldStatesExampleComponent {}
