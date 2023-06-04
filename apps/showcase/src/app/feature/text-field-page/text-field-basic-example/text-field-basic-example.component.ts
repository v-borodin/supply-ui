import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupTextFieldModule } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-text-field-basic-example',
  imports: [SupTextFieldModule],
  templateUrl: './text-field-basic-example.component.html',
  styleUrls: ['./text-field-basic-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldBasicExampleComponent {}
