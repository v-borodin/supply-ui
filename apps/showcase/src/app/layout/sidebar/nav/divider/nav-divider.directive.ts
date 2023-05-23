import { Directive, InjectionToken } from '@angular/core';

export const NAV_DIVIDER = new InjectionToken<NavDividerDirective>(
  '[NAV_DIVIDER]'
);

@Directive({
  selector: 'app-nav-divider',
  providers: [
    {
      provide: NAV_DIVIDER,
      useExisting: NavDividerDirective,
    },
  ],
})
export class NavDividerDirective {}
