import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupTableModule } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-default-table-example',
  templateUrl: './default-table-example.component.html',
  styleUrls: ['./default-table-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SupTableModule],
})
export class DefaultTableExampleComponent {}
