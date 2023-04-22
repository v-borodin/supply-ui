import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion.component';
import {
  AccordionItemComponent,
  SupIconComponent,
} from '@supply/uikit/components';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ExpanderComponent } from '@supply/uikit/components/expander';

@NgModule({
  declarations: [AccordionComponent, AccordionItemComponent],
  imports: [NgTemplateOutlet, NgIf, ExpanderComponent, SupIconComponent],
  exports: [AccordionComponent, AccordionItemComponent],
})
export class SupAccordionModule {}
