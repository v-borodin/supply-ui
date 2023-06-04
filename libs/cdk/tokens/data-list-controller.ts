import { InjectionToken } from '@angular/core';
import { SupDataListController } from '@supply/cdk/interfaces';

export const SUP_DATA_LIST_CONTROLLER = new InjectionToken<
  SupDataListController<unknown>
>('');
