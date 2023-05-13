import { NgModule } from '@angular/core';
import { DialogPageComponent } from './dialog-page.component';
import { LayoutModule } from '../../layout/layout.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DialogPageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DialogPageComponent,
      },
    ]),
    LayoutModule,
  ],
})
export class DialogPageModule {}
