import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const SUB_TAB_ACTIVATE_EVENT = 'sup-tab-active';

export const SUP_TAB_ACTIVATION = new InjectionToken<Observable<CustomEvent>>(
  '@component/tabs:ACTIVATION_TOKEN',
);
