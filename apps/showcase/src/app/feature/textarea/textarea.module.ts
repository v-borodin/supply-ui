import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TextareaComponent } from './textarea.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [TextareaComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TextareaComponent,
      },
    ]),
    LayoutModule,
  ],
})
export class TextareaModule {}
