import { NgModule } from '@angular/core';
import { TextFieldPageComponent } from './text-field-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [TextFieldPageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TextFieldPageComponent,
      },
    ]),
    LayoutModule,
  ],
})
export class TextFieldPageModule {}
