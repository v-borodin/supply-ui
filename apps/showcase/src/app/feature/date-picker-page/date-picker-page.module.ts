import { NgModule } from '@angular/core';
import { DatePickerPageComponent } from './date-picker-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [DatePickerPageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DatePickerPageComponent,
      },
    ]),
    LayoutModule,
  ],
})
export class DatePickerPageModule {}
