import {Inject, Injectable} from '@angular/core';
import {
  concat,
  filter,
  first,
  fromEvent,
  map,
  Observable,
  of,
  race,
  repeat,
  retry,
  switchMap,
  take,
  takeUntil,
  timer,
} from 'rxjs';
import {DOCUMENT} from '@angular/common';

export type SupFocusOrigin = 'touch' | 'mouse' | 'keyboard' | 'script' | null;

function mapToOrigin(origin: SupFocusOrigin) {
  return function <T>(source: Observable<T>): Observable<SupFocusOrigin> {
    return source.pipe(map(() => origin));
  };
}

@Injectable({
  providedIn: 'root',
})
export class SupFocusTracker {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {
  }

  track(element: HTMLElement): Observable<SupFocusOrigin> {
    return concat(
      race(
        fromEvent(element, 'touchend').pipe(mapToOrigin('touch')),
        fromEvent(element, 'mousedown').pipe(mapToOrigin('mouse')),
        fromEvent(this.document, 'keydown').pipe(mapToOrigin('keyboard')),
        fromEvent(element, 'focus').pipe(mapToOrigin('script'))
      ).pipe(
        switchMap(type =>
          type === 'script'
            ? of(type)
            : fromEvent(element, 'focus').pipe(
              map(() => type),
              takeUntil(timer(0))
            )
        ),
        first(),
        retry()
      ),
      fromEvent(element, 'blur').pipe(
        filter(() => !this.isElementFocused(element)),
        mapToOrigin(null),
        take(1)
      )
    ).pipe(repeat());
  }

  private isElementFocused(element: HTMLElement): boolean {
    return element === this.document.activeElement;
  }
}
