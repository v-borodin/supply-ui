import { InjectionToken } from '@angular/core';

export const SUP_CLOSE_WORD = new InjectionToken<string>('@uikit/tokens:SUP_DEFAULT_CLOSE_WORD', {
  factory: () => 'Close',
});
