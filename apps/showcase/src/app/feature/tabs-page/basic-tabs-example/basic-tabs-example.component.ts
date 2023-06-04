import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SupAlertService } from '@supply/uikit';

@Component({
  selector: 'app-basic-tabs-example',
  templateUrl: './basic-tabs-example.component.html',
  styleUrls: ['./basic-tabs-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTabsExampleComponent {
  alert = inject(SupAlertService);

  onTabChange(index: number): void {
    this.alert.push(`Tab <b>${index + 1}</b> selected`, {
      status: 'success',
    });
  }
}
