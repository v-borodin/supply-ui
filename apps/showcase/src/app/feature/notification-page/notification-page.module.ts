import { NgModule } from '@angular/core';
import { NotificationPageComponent } from './notification-page.component';
import { RouterModule } from '@angular/router';
import { SupIconComponent } from '@supply/uikit';
import { SharedModule } from '../../common/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { NotificationStatusDemoComponent } from './notification-status/notification-status-demo.component';
import { NotificationCloseDemoComponent } from './notification-close/notification-close-demo.component';

@NgModule({
  declarations: [
    NotificationPageComponent,
    NotificationStatusDemoComponent,
    NotificationCloseDemoComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NotificationPageComponent,
      },
    ]),
    SharedModule,
    SupIconComponent,
    LayoutModule,
  ],
})
export class NotificationPageModule {}
