import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-section-list',
  template: '<ng-content/>',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionListComponent {
  readonly elementRef = inject(ElementRef);
}
