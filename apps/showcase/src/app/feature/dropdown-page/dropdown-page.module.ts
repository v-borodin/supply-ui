import { NgModule } from '@angular/core';
import { DropdownPageComponent } from './dropdown-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { DropdownTemplateDemoComponent } from './dropdown-template-example/dropdown-template-demo.component';
import { SharedModule } from '../../common/shared.module';

@NgModule({
  declarations: [DropdownPageComponent, DropdownTemplateDemoComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DropdownPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
  ],
})
export class DropdownPageModule {}
