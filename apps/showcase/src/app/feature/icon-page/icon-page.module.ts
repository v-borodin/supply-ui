import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconPageComponent } from './icon-page.component';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../common/shared.module';
import { SvgRegistryDemoComponent } from './svg-registry/svg-registry-demo.component';

@NgModule({
  declarations: [IconPageComponent, SvgRegistryDemoComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: IconPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
  ],
})
export class IconPageModule {}
