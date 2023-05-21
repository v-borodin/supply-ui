import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SupDialogRef } from '@supply/cdk';

@Component({
  selector: 'app-test-dialog-component',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDialogComponent {
  readonly dialogRef = inject(SupDialogRef);
}
