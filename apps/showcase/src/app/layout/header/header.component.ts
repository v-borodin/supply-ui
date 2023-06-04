import { ChangeDetectionStrategy, Component, inject, TemplateRef } from '@angular/core';
import { SupDialogService } from '@supply/uikit';

@Component({
  selector: 'header[appHeader]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    id: 'header',
    role: 'banner',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  modal = inject(SupDialogService);

  showModal(template: TemplateRef<any>): void {
    this.modal.open(template, {
      label: '© Licence',
    });
  }
}
