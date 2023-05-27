import { filter, map, merge, Observable, Subject, takeUntil } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import {
  SupDialogCloseOptions,
  SupDialogData,
  SupDialogOptions,
  SupHasId,
} from '@supply/cdk/interfaces';
import { supHasModifierKey } from '@supply/cdk/utils';
import { preventDefault } from '@supply/cdk/observables';
import { SupDialog, SupFocusOrigin } from '@supply/cdk/types';

export class SupDialogRef<TResult = unknown, TData = any>
  implements SupHasId<string>, SupDialogData<TData>
{
  readonly id: string;

  readonly data: TData;

  private readonly close$ = new Subject<TResult | null>();

  get onCompleted(): Observable<TResult | null> {
    return this.close$.asObservable();
  }

  private readonly dismissibleEvents$ = merge(
    this.overlayRef.keydownEvents().pipe(
      filter(event => event.key === 'Escape' && !supHasModifierKey(event)),
      preventDefault(),
      map(() => 'keyboard')
    ),
    this.overlayRef.backdropClick().pipe(map(() => 'mouse'))
  );

  constructor(
    readonly overlayRef: OverlayRef,
    { id, data, dismissible }: SupDialog<SupDialogOptions<TData>>
  ) {
    this.id = id;
    this.data = data;

    if (dismissible) {
      this.dismissibleEvents$.pipe(takeUntil(this.close$)).subscribe(origin => {
        this.close(null, { focusOrigin: origin as SupFocusOrigin });
      });
    }
  }

  close(result: TResult | null = null, options?: SupDialogCloseOptions): void {
    this.overlayRef.dispose();

    this.close$.next(result);
    this.close$.complete();
  }
}
