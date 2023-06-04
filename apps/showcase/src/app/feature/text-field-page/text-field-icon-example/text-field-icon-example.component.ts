import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupTextFieldModule } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-text-field-icon-example',
  imports: [SupTextFieldModule],
  templateUrl: './text-field-icon-example.component.html',
  styleUrls: ['./text-field-icon-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldIconExampleComponent {}
