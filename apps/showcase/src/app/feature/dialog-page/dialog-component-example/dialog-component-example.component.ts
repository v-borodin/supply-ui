import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SupButtonComponent, SupDialogService, SupTextFieldModule } from '@supply/uikit';
import { TestDialogComponent } from './test-dialog-component/test-dialog.component';
import { SupLabelDirective } from '@supply/uikit/directives';

@Component({
  standalone: true,
  selector: 'app-dialog-component-example',
  imports: [SupButtonComponent, SupTextFieldModule, SupLabelDirective],
  templateUrl: './dialog-component-example.component.html',
  styleUrls: ['./dialog-component-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponentExampleComponent {
  private readonly dialog = inject(SupDialogService);

  open(data: string): void {
    this.dialog
      .open<string, string>(TestDialogComponent, {
        label: 'Component dialog with input data',
        data: data,
      })
      .subscribe(result => {});
  }
}
