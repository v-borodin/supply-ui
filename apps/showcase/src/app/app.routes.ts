import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { IntroductionPageComponent } from './feature/introduction-page/introduction-page.component';

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
        title: 'Introduction',
        component: IntroductionPageComponent,
      },
      {
        path: 'components',
        children: [
          {
            path: 'button',
            title: 'Button',
            loadChildren: () => import('./feature/button-page/button-page.module').then(m => m.ButtonPageModule),
          },
          {
            path: 'notification',
            title: 'Notification',
            loadChildren: () =>
              import('./feature/notification-page/notification-page.module').then(m => m.NotificationPageModule),
          },
        ],
      },
    ],
  },
];
