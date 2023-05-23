import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'hr[appPageDivider]',
  template: '',
  styleUrls: ['./page-divider.component.scss'],
  inputs: ['top', 'bottom'],
  host: {
    class: 'sup-divider',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageDividerComponent {
  @HostBinding('style.margin-top.rem')
  top = 2;

  @HostBinding('style.margin-bottom.rem')
  bottom = 2.25;
}
