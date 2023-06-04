import { NgModule } from '@angular/core';
import { DatePickerPageComponent } from './date-picker-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { DatePickerBasicExampleComponent } from './date-picker-basic-example/date-picker-basic-example.component';
import { DatePickerBasicDemoComponent } from './date-picker-basic-example/date-picker-basic-demo.component';
import { SharedModule } from '../../common/shared.module';
import { SupAlertModule, SupDateInputModule, SupTextFieldModule } from '@supply/uikit';

@NgModule({
  declarations: [
    DatePickerPageComponent,
    DatePickerBasicExampleComponent,
    DatePickerBasicDemoComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DatePickerPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
    SupDateInputModule,
    SupTextFieldModule,
    SupAlertModule.forRoot(),
  ],
})
export class DatePickerPageModule {}
