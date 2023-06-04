import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TextareaPageComponent } from './textarea-page.component';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../common/shared.module';
import { TextareaBasicDemoComponent } from './textarea-basic-example/textarea-basic-demo.component';

@NgModule({
  declarations: [TextareaPageComponent, TextareaBasicDemoComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TextareaPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
  ],
})
export class TextareaPageModule {}
