import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupTextFieldModule } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-textarea-basic-example',
  imports: [SupTextFieldModule],
  templateUrl: './textarea-basic-example.component.html',
  styleUrls: ['./textarea-basic-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaBasicExampleComponent {}
