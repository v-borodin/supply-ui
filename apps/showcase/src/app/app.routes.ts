import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { IntroductionPageComponent } from './feature/introduction-page/introduction-page.component';
import { GITHUB_PATH_URL } from './core/tokens/github-path-url';
import { FactoryProvider, Host, Optional } from '@angular/core';
import { GithubUrlService } from './core/services/github-url.service';
import { PROJECT_NAME } from './core/tokens/project-name';
import { LibProject } from './core/enums/projects';

export function githubUrlProvider(
  path: string,
  explicitProject?: string
): FactoryProvider {
  return {
    provide: GITHUB_PATH_URL,
    deps: [GithubUrlService, [PROJECT_NAME, new Host(), new Optional()]],
    useFactory: (github: GithubUrlService, projectName: LibProject) => {
      return `${github.getProjectUrl(explicitProject ?? projectName)}/${path}`;
    },
  };
}

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
        providers: [
          {
            provide: PROJECT_NAME,
            useValue: LibProject.Uikit,
          },
        ],
        children: [
          {
            path: 'button',
            title: 'Button',
            providers: [githubUrlProvider('components/button')],
            loadChildren: () =>
              import('./feature/button-page/button-page.module').then(
                m => m.ButtonPageModule
              ),
          },
          {
            path: 'notification',
            title: 'Notification',
            providers: [githubUrlProvider('components/notification')],
            loadChildren: () =>
              import('./feature/notification-page/notification-page.module').then(
                m => m.NotificationPageModule
              ),
          },
          {
            path: 'icon',
            title: 'Icon',
            providers: [githubUrlProvider('components/icon')],
            loadChildren: () =>
              import('./feature/icon-page/icon-page.module').then(m => m.IconPageModule),
          },
          {
            path: 'dialog',
            title: 'Dialog',
            providers: [githubUrlProvider('components/dialog')],
            loadChildren: () =>
              import('./feature/dialog-page/dialog-page.module').then(
                m => m.DialogPageModule
              ),
          },
          {
            path: 'accordion',
            title: 'Accordion',
            providers: [githubUrlProvider('components/accordion')],
            loadChildren: () =>
              import('./feature/accordion-page/accordion-page.module').then(
                m => m.AccordionPageModule
              ),
          },
          {
            path: 'table',
            title: 'Table',
            providers: [githubUrlProvider('components/table')],
            loadChildren: () =>
              import('./feature/table-page/table-page.module').then(
                m => m.TablePageModule
              ),
          },
        ],
      },
    ],
  },
];
