import { inject, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { SupDialogData } from '@supply/cdk/interfaces';
import { SupIdGeneratorStrategy } from '@supply/cdk/services';
import { SupDialog } from '@supply/cdk/types';

@Injectable()
export abstract class SupAbstractDialogService<
  TOptions extends Record<any, any> & SupDialogData<TInput>,
  TInput = unknown,
  TOutput = unknown
> {
  protected abstract readonly container: Type<unknown>;

  protected abstract readonly defaultOptions: TOptions;

  private readonly id = inject(SupIdGeneratorStrategy);

  /**
   * @param content
   * @param options
   * @returns Stream of result <TOutput or R> value
   */
  open<R, D = unknown, C = any>(
    content: ReflectiveContent<C>,
    options: Partial<TOptions & SupDialogData<TInput extends unknown ? D : TInput>> = {}
  ): Observable<TOutput extends unknown ? R : TOutput | null> {
    const { defaultOptions, container, id } = this;

    const newDialog = {
      ...defaultOptions,
      ...options,
      content,
      container,
      createdAt: Date.now(),
      id: id.generate(),
    } as const;

    return this.create(newDialog);
  }

  protected abstract create(dialog: SupDialog<any>): Observable<any>;
}
