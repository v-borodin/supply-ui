import { NgModule } from '@angular/core';
import { TablePageComponent } from './table-page.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { DefaultTableDemoComponent } from './default-table-example/default-table-demo.component';
import { SharedModule } from '../../common/shared.module';

@NgModule({
  declarations: [TablePageComponent, DefaultTableDemoComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TablePageComponent,
      },
    ]),
    LayoutModule,
    SharedModule,
  ],
})
export class TablePageModule {}
