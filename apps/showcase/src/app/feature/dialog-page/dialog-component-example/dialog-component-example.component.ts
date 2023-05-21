import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SupButtonComponent, SupDialogService } from '@supply/uikit';
import { TestDialogComponent } from './test-dialog-component/test-dialog.component';

@Component({
  standalone: true,
  selector: 'app-dialog-component-example',
  imports: [SupButtonComponent],
  templateUrl: './dialog-component-example.component.html',
  styleUrls: ['./dialog-component-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponentExampleComponent {
  private readonly dialog = inject(SupDialogService);

  open(): void {
    this.dialog
      .open<string, string>(TestDialogComponent, {
        label: 'Component dialog with result',
        data: 'Data from .ts',
      })
      .subscribe(result => {});
  }
}
