import { NgModule } from '@angular/core';
import { TablePageComponent } from './table-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { DefaultTableDemoComponent } from './default-table-example/default-table-demo.component';
import { SharedModule } from '../../common/shared.module';
import { SupAlertModule, SupTableModule } from '@supply/uikit';
import { DefaultTableExampleComponent } from './default-table-example/default-table-example.component';

@NgModule({
  declarations: [
    TablePageComponent,
    DefaultTableExampleComponent,
    DefaultTableDemoComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TablePageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
    SupAlertModule.forRoot(),
    SupTableModule,
  ],
})
export class TablePageModule {}
