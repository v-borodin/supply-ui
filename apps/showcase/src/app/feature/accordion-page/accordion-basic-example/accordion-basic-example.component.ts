import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupAccordionModule } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-accordion-basic-example',
  templateUrl: './accordion-basic-example.component.html',
  styleUrls: ['./accordion-basic-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SupAccordionModule],
})
export class AccordionBasicExampleComponent {}
