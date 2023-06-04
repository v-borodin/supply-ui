import { NgModule } from '@angular/core';
import { SelectPageComponent } from './select-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../common/shared.module';
import { SelectBasicDemoComponent } from './select-basic-example/select-basic-demo.component';
import { SelectBasicExampleComponent } from './select-basic-example/select-basic-example.component';
import {
  SupAlertModule,
  SupDataListModule,
  SupSelectModule,
  SupTextFieldModule,
} from '@supply/uikit';
import { NgForOf } from '@angular/common';
import { SupLabelDirective } from '@supply/uikit/directives';

@NgModule({
  declarations: [
    SelectPageComponent,
    SelectBasicExampleComponent,
    SelectBasicDemoComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SelectPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
    SupAlertModule.forRoot(),
    SupDataListModule,
    SupSelectModule,
    SupTextFieldModule,
    SupLabelDirective,
    NgForOf,
  ],
})
export class SelectPageModule {}
