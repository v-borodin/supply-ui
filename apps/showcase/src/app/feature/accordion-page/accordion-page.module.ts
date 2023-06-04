import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionPageComponent } from './accordion-page.component';
import { LayoutModule } from '../../layout/layout.module';
import { AccordionBasicDemoComponent } from './accordion-basic-example/accordion-basic-demo.component';
import { SharedModule } from '../../common/shared.module';

@NgModule({
  declarations: [AccordionPageComponent, AccordionBasicDemoComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AccordionPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
  ],
})
export class AccordionPageModule {}
