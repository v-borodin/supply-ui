import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion.component';
import { SupIconComponent } from '@supply/uikit/components/icon';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ExpanderComponent } from '@supply/uikit/components/expander';
import { AccordionItemComponent } from '../accordion';

@NgModule({
  declarations: [AccordionComponent, AccordionItemComponent],
  imports: [NgTemplateOutlet, NgIf, ExpanderComponent, SupIconComponent],
  exports: [AccordionComponent, AccordionItemComponent],
})
export class SupAccordionModule {}
