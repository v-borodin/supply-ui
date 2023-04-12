import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sup-form-field',
  templateUrl: './form-field.html',
  styleUrls: ['./form-field.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  constructor() {}
}
