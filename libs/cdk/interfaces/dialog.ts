import { Injector, Type } from '@angular/core';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { OverlayConfig } from '@angular/cdk/overlay';
import { SupFocusOrigin } from '@supply/cdk/types';
import { SupHasId } from './elements';

export interface SupDialogBase<TContext> extends SupHasId<string> {
  container: Type<unknown>;

  content: ReflectiveContent<TContext>;

  createdAt: number;
}

type SupDialogRole = 'dialog' | 'alertdialog';

export interface SupDialogData<TData> {
  data: TData;
}

export interface SupDialogOptions<TData = unknown> extends SupDialogData<TData> {
  readonly size: 'sm' | 'md' | 'lg' | 'full' | 'auto' | string;

  readonly closable: boolean;

  readonly dismissible: boolean;

  readonly role: SupDialogRole;

  readonly label?: ReflectiveContent;

  readonly header?: ReflectiveContent;

  readonly footer?: ReflectiveContent;

  readonly injector?: Injector;

  readonly overlayConfig?: OverlayConfig;
}

export interface SupDialogCloseOptions {
  focusOrigin?: SupFocusOrigin;
}
