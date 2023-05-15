import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionPageComponent } from './accordion-page.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [AccordionPageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AccordionPageComponent,
      },
    ]),
    LayoutModule,
  ],
})
export class AccordionPageModule {}
