import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipPageComponent } from './tooltip-page.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [TooltipPageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TooltipPageComponent,
      },
    ]),
    LayoutModule,
  ],
})
export class TooltipPageModule {}
