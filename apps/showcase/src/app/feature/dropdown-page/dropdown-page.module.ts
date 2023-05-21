import { NgModule } from '@angular/core';
import { DropdownPageComponent } from './dropdown-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [DropdownPageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DropdownPageComponent,
      },
    ]),
    LayoutModule,
  ],
})
export class DropdownPageModule {}
