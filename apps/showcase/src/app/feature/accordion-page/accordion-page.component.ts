import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-accordion-page',
  templateUrl: './accordion-page.component.html',
  styleUrls: ['./accordion-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionPageComponent {}
