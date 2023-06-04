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
            path: 'alert',
            title: 'Alert',
            providers: [githubUrlProvider('components/alert')],
            loadChildren: () =>
              import('./feature/alert-page/alert-page.module').then(
                m => m.AlertPageModule
              ),
          },
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
            path: 'dropdown',
            title: 'Dropdown',
            providers: [githubUrlProvider('components/dropdown')],
            loadChildren: () =>
              import('./feature/dropdown-page/dropdown-page.module').then(
                m => m.DropdownPageModule
              ),
          },
          {
            path: 'text-field',
            title: 'Textfield',
            providers: [githubUrlProvider('components/text-field')],
            loadChildren: () =>
              import('./feature/text-field-page/text-field-page.module').then(
                m => m.TextFieldPageModule
              ),
          },
          {
            path: 'date-picker',
            title: 'Date Picker',
            providers: [githubUrlProvider('components/date-input')],
            loadChildren: () =>
              import('./feature/date-picker-page/date-picker-page.module').then(
                m => m.DatePickerPageModule
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
            path: 'textarea',
            title: 'Textarea',
            providers: [githubUrlProvider('components/textarea')],
            loadChildren: () =>
              import('./feature/textarea-page/textarea-page.module').then(
                m => m.TextareaPageModule
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
          {
            path: 'tooltip',
            title: 'Tooltip',
            providers: [githubUrlProvider('components/tooltip')],
            loadChildren: () =>
              import('./feature/tooltip-page/tooltip-page.module').then(
                m => m.TooltipPageModule
              ),
          },
          {
            path: 'select',
            title: 'Select',
            providers: [githubUrlProvider('components/select')],
            loadChildren: () =>
              import('./feature/select-page/select-page.module').then(
                m => m.SelectPageModule
              ),
          },
          {
            path: 'tabs',
            title: 'Tabs',
            providers: [githubUrlProvider('components/tabs')],
            loadChildren: () =>
              import('./feature/tabs-page/tabs-page.module').then(m => m.TabsPageModule),
          },
        ],
      },
      {
        path: 'tools',
        providers: [
          {
            provide: PROJECT_NAME,
            useValue: LibProject.Cdk,
          },
        ],
        children: [
          {
            path: 'type-guards',
            title: 'Type Guards',
            providers: [githubUrlProvider('utils/type-guards')],
            loadChildren: () =>
              import('./feature/type-guards-page/type-guards-page.module').then(
                m => m.TypeGuardsPageModule
              ),
          },
          {
            path: 'memoize',
            title: 'Memoize Decorator',
            providers: [githubUrlProvider('decorators/memoize')],
            loadChildren: () =>
              import('./feature/memoize-page/memoize-page.module').then(
                m => m.MemoizePageModule
              ),
          },
          {
            path: 'operators',
            title: 'RXJS Operators',
            providers: [githubUrlProvider('operators/operators')],
            loadChildren: () =>
              import('./feature/operators-page/operators-page.module').then(
                m => m.OperatorsPageModule
              ),
          },
        ],
      },
    ],
  },
];
