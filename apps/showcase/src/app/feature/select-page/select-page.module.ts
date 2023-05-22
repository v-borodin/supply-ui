import { NgModule } from '@angular/core';
import { SelectPageComponent } from './select-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../common/shared.module';

@NgModule({
  declarations: [SelectPageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SelectPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
  ],
})
export class SelectPageModule {}
