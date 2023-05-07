import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { IntroductionPageComponent } from './feature/introduction-page/introduction-page.component';
import { ButtonPageComponent } from './feature/button-page/button-page.component';
import { NotificationPageComponent } from './feature/notification-page/notification-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'introduction',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'introduction',
        component: IntroductionPageComponent,
      },
      {
        path: 'components',
        children: [
          {
            path: 'button',
            component: ButtonPageComponent,
          },
          {
            path: 'notification',
            component: NotificationPageComponent,
          },
        ],
      },
    ],
  },
];
