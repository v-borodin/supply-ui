import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsPageComponent } from './tabs-page.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [TabsPageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TabsPageComponent,
      },
    ]),
    LayoutModule,
  ],
})
export class TabsPageModule {}
