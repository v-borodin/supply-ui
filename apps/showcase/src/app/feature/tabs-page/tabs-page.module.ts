import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsPageComponent } from './tabs-page.component';
import { LayoutModule } from '../../layout/layout.module';
import { BasicTabsExampleComponent } from './basic-tabs-example/basic-tabs-example.component';
import { BasicTabsDemoComponent } from './basic-tabs-example/basic-tabs-demo.component';
import { SharedModule } from '../../common/shared.module';
import { SupAlertModule, SupTabsModule } from '@supply/uikit';
import { NgIf } from '@angular/common';

@NgModule({
  declarations: [TabsPageComponent, BasicTabsExampleComponent, BasicTabsDemoComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TabsPageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
    SupTabsModule,
    SupAlertModule.forRoot(),
    NgIf,
  ],
})
export class TabsPageModule {}
