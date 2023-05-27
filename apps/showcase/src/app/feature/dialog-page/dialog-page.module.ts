import { NgModule } from '@angular/core';
import { DialogPageComponent } from './dialog-page.component';
import { LayoutModule } from '../../layout/layout.module';
import { RouterModule } from '@angular/router';
import { DialogTemplateDemoComponent } from './dialog-template-example/dialog-template-demo.component';
import { SharedModule } from '../../common/shared.module';
import { TestDialogComponent } from './dialog-component-example/test-dialog-component/test-dialog.component';
import { DialogComponentDemoComponent } from './dialog-component-example/dialog-component-demo.component';
import { SupButtonComponent } from '@supply/uikit';

@NgModule({
  declarations: [
    DialogPageComponent,
    DialogTemplateDemoComponent,
    DialogComponentDemoComponent,
    TestDialogComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DialogPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
    SupButtonComponent,
  ],
})
export class DialogPageModule {}
