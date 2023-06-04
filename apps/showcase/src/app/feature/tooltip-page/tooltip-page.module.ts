import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipPageComponent } from './tooltip-page.component';
import { LayoutModule } from '../../layout/layout.module';
import { TooltipBasicDemoComponent } from './tooltip-basic-example/tooltip-basic-demo.component';
import { SharedModule } from '../../common/shared.module';

@NgModule({
  declarations: [TooltipPageComponent, TooltipBasicDemoComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TooltipPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
  ],
})
export class TooltipPageModule {}
