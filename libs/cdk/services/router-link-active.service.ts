import { Inject, Injectable, NgZone, Optional, Self, InjectionToken, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { EMPTY, merge, Observable, timer } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, share } from 'rxjs/operators';
import { SupDestroyService } from './destroy.service';

export const ANIMATION_FRAME = new InjectionToken<Observable<DOMHighResTimeStamp>>(
  'Shared Observable based on `window.requestAnimationFrame`',
  {
    factory: () => {
      const window = inject(DOCUMENT).defaultView;

      if (!window) {
        throw new Error('Window is not available');
      }

      const { requestAnimationFrame, cancelAnimationFrame } = window;
      const animationFrame$ = new Observable<DOMHighResTimeStamp>(subscriber => {
        let id = NaN;
        const callback = (timestamp: DOMHighResTimeStamp) => {
          subscriber.next(timestamp);
          id = requestAnimationFrame(callback);
        };

        id = requestAnimationFrame(callback);

        return () => {
          cancelAnimationFrame(id);
        };
      });

      return animationFrame$.pipe(share());
    },
  },
);

@Injectable()
export class SupRouterLinkActiveService extends Observable<boolean> {
  constructor(
    @Optional()
    @Inject(RouterLinkActive)
    routerLinkActive: RouterLinkActive | null,
    @Inject(NgZone) ngZone: NgZone,
    @Inject(ANIMATION_FRAME) animationFrame$: Observable<number>,
    @Self() @Inject(SupDestroyService) destroy$: Observable<void>,
  ) {
    const stream$ = routerLinkActive
      ? merge(timer(0), animationFrame$).pipe(
          map(() => routerLinkActive.isActive),
          distinctUntilChanged(),
          takeUntil(destroy$),
        )
      : EMPTY;

    super(subscriber => stream$.subscribe(subscriber));
  }
}
