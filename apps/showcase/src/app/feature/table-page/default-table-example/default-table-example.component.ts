import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SupAlertService, SupSortDirection } from '@supply/uikit';

@Component({
  selector: 'app-default-table-example',
  templateUrl: './default-table-example.component.html',
  styleUrls: ['./default-table-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultTableExampleComponent {
  alert = inject(SupAlertService);

  onSorterChange(sorter: string): void {
    this.alert.push(`<b>New sorter:</b> ${sorter}`, { status: 'success' });
  }

  onDirectionChange(direction: SupSortDirection): void {
    this.alert.push(`<b>New direction:</b> ${direction}`, { status: 'info' });
  }
}
