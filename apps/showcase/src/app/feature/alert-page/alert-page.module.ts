import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../common/shared.module';
import { AlertPageComponent } from './alert-page.component';
import { AlertBasicDemoComponent } from './alert-basic-example/alert-basic-demo.component';
import { LayoutModule } from '../../layout/layout.module';
import { AlertBasicExampleComponent } from './alert-basic-example/alert-basic-example.component';
import {
  SupAlertModule,
  SupButtonComponent,
  SupDataListModule,
  SupSelectModule,
  SupTextFieldModule,
} from '@supply/uikit';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertStatusExampleComponent } from './alert-status-example/alert-status-example.component';
import { AlertStatusDemoComponent } from './alert-status-example/alert-status-demo.component';

@NgModule({
  declarations: [
    AlertPageComponent,
    AlertBasicExampleComponent,
    AlertStatusExampleComponent,
    AlertStatusDemoComponent,
    AlertBasicDemoComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AlertPageComponent,
      },
    ]),
    SupAlertModule.forRoot(),
    SupButtonComponent,
    SharedModule,
    LayoutModule,
    SupTextFieldModule,
    ReactiveFormsModule,
    SupSelectModule,
    SupDataListModule,
  ],
})
export class AlertPageModule {}
