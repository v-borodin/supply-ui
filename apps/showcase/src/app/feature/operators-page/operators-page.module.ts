import { NgModule } from '@angular/core';
import { OperatorsPageComponent } from './operators-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { FromRouterEventDemoComponent } from './from-router-event/from-router-event-demo.component';
import { SharedModule } from '../../common/shared.module';
import { OutsideAngularDemoComponent } from './outside-angular/outside-angular-demo.component';
import { PreventDefaultDemoComponent } from './prevent-default/prevent-default-demo.component';
import { StopPropagationDemoComponent } from './stop-propagation/stop-propagation-demo.component';

@NgModule({
  declarations: [
    OperatorsPageComponent,
    FromRouterEventDemoComponent,
    OutsideAngularDemoComponent,
    PreventDefaultDemoComponent,
    StopPropagationDemoComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OperatorsPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
  ],
})
export class OperatorsPageModule {}
