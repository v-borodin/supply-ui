import { NgModule } from '@angular/core';
import { MemoizePageComponent } from './memoize-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [MemoizePageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MemoizePageComponent,
      },
    ]),
    LayoutModule,
  ],
})
export class MemoizePageModule {}
