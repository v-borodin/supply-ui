import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SupButtonComponent, SupDialogService } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-dialog-template-example',
  imports: [SupButtonComponent],
  templateUrl: './dialog-template-example.component.html',
  styleUrls: ['./dialog-template-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTemplateExampleComponent {
  readonly dialog = inject(SupDialogService); // <-- inject this
}
