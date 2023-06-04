import { NgModule } from '@angular/core';
import { TypeGuardsPageComponent } from './type-guards-page.component';
import { LayoutModule } from '../../layout/layout.module';
import { RouterModule } from '@angular/router';
import { TypeGuardsBasicExampleComponent } from './type-guards-basic-example/type-guards-basic-example.component';
import { TypeGuardsBasicDemoComponent } from './type-guards-basic-example/type-guards-basic-demo.component';
import { SharedModule } from '../../common/shared.module';

@NgModule({
  declarations: [
    TypeGuardsPageComponent,
    TypeGuardsBasicExampleComponent,
    TypeGuardsBasicDemoComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TypeGuardsPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
  ],
})
export class TypeGuardsPageModule {}
