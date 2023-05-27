import {
  debounceTime,
  distinctUntilChanged,
  filter,
  MonoTypeOperatorFunction,
  Observable,
  ObservableInput,
  OperatorFunction,
  pipe,
  switchMap,
  tap,
  UnaryFunction,
} from 'rxjs';
import { inject, NgZone } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { supIsObject } from '../utils';

export function stopPropagation<
  T extends Event
>(): MonoTypeOperatorFunction<T> {
  return tap(e => {
    e.stopPropagation();
  });
}

export function preventDefault<T extends Event>(): MonoTypeOperatorFunction<T> {
  return tap(e => {
    e.preventDefault();
  });
}

export function outsideAngular<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return source =>
    new Observable(subscriber =>
      ngZone.runOutsideAngular(() => source.subscribe(subscriber))
    );
}

export function fromResize(element: Element): Observable<ResizeObserverEntry> {
  return new Observable<ResizeObserverEntry>(subscriber => {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === element) {
          subscriber.next(entry);
        }
      });
    });

    resizeObserver.observe(element, { box: 'border-box' });

    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  });
}

export function runOutsideAngular<T>(
  source: Observable<T>,
  ngZone?: NgZone
): Observable<T> {
  const zone = ngZone || inject(NgZone);
  return new Observable(observer => {
    return source.subscribe({
      next(value) {
        zone.runOutsideAngular(() => {
          observer.next(value);
        });
      },
      error(err) {
        zone.runOutsideAngular(() => {
          observer.error(err);
        });
      },
      complete() {
        zone.runOutsideAngular(() => {
          observer.complete();
        });
      },
    });
  });
}

export function filterNullish<T>(): UnaryFunction<
  Observable<T | null | undefined>,
  Observable<T>
> {
  return pipe(
    filter(x => x != null) as OperatorFunction<T | null | undefined, T>
  );
}

export function fromRouterEvent<T extends RouterEvent>(
  event: { new (...args: any[]): T },
  router?: Router
): Observable<T> {
  const injectedRouter = router || inject(Router);
  return injectedRouter.events.pipe(
    filter((e: unknown): e is T => e instanceof event)
  );
}

export function filterPrimitive() {
  return function <T>(source: Observable<T>) {
    return source.pipe(filter(value => !supIsObject(value)));
  };
}

export type DataProducer<T> = (value: string) => ObservableInput<T>;

export function liveSearch<R>(
  time: number,
  dataProducer: DataProducer<R>,
  beforeSwitch?: (value: any) => void
): OperatorFunction<string, R> {
  return pipe(
    filterNullish(),
    tap(beforeSwitch),
    debounceTime(time),
    distinctUntilChanged(),
    switchMap(dataProducer)
  );
}
