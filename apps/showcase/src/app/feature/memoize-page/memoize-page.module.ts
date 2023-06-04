import { NgModule } from '@angular/core';
import { MemoizePageComponent } from './memoize-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { MemoizeBasicExampleComponent } from './memoize-basic-example/memoize-basic-example.component';
import { MemoizeBasicDemoComponent } from './memoize-basic-example/memoize-basic-demo.component';
import { SharedModule } from '../../common/shared.module';

@NgModule({
  declarations: [
    MemoizePageComponent,
    MemoizeBasicExampleComponent,
    MemoizeBasicDemoComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MemoizePageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
  ],
})
export class MemoizePageModule {}
