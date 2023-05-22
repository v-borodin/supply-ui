import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TextareaPageComponent } from './textarea-page.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [TextareaPageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TextareaPageComponent,
      },
    ]),
    LayoutModule,
  ],
})
export class TextareaPageModule {}
