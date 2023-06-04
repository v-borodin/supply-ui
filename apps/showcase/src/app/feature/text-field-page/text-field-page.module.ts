import { NgModule } from '@angular/core';
import { TextFieldPageComponent } from './text-field-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { TextFieldBasicDemoComponent } from './text-field-basic-example/text-field-basic-demo.component';
import { SharedModule } from '../../common/shared.module';
import { TextFieldIconDemoComponent } from './text-field-icon-example/text-field-icon-demo.component';
import { TextFieldStatesDemoComponent } from './text-field-states-example/text-field-states-demo.component';

@NgModule({
  declarations: [
    TextFieldPageComponent,
    TextFieldBasicDemoComponent,
    TextFieldIconDemoComponent,
    TextFieldStatesDemoComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TextFieldPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
  ],
})
export class TextFieldPageModule {}
