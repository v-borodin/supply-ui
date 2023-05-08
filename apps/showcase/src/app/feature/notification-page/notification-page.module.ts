import { NgModule } from '@angular/core';
import { NotificationPageComponent } from './notification-page.component';
import { RouterModule } from '@angular/router';
import { NotificationStatusExampleComponent } from './notification-status/notification-status-example.component';
import { NotificationStatusDemoComponent } from './notification-status/notification-status-demo.component';
import { SharedModule } from '../../common/shared.module';
import { SupIconComponent } from '@supply/uikit';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [NotificationPageComponent, NotificationStatusDemoComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NotificationPageComponent,
      },
    ]),
    NotificationStatusExampleComponent,
    SharedModule,
    SupIconComponent,
    LayoutModule,
  ],
})
export class NotificationPageModule {}
