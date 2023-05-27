import { InjectionToken } from '@angular/core';

export const APP_TITLE = new InjectionToken<string>('[APP_TITLE]', {
  providedIn: 'root',
  factory: () => 'UIKIT',
});
