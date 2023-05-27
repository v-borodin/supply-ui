import { Inject, Injectable } from '@angular/core';
import { filter, iif, map, merge, Observable, of, switchMap } from 'rxjs';
import {
  NavigationStart,
  ResolveEnd,
  ResolveStart,
  Route,
  Router,
  RouterEvent,
} from '@angular/router';
import { fromRouterEvent } from '../observables';
import { FALSE_HANDLER, TRUE_HANDLER } from '../constants';

function pathBased(path: string | null) {
  return function <T extends RouterEvent>(
    source: Observable<T>
  ): Observable<T> {
    return source.pipe(
      switchMap(event => {
        const fallback = of(event);
        return iif(
          () => !!path,
          of(event).pipe(filter(resolveStart => resolveStart.url === path)),
          fallback
        );
      })
    );
  };
}

@Injectable({
  providedIn: 'root',
})
export class SupRouterEventsService {
  get navigationStart(): Observable<NavigationStart> {
    return fromRouterEvent(NavigationStart, this.router);
  }

  get resolveStart(): Observable<ResolveStart> {
    return fromRouterEvent(ResolveStart, this.router);
  }

  get resolveEnd(): Observable<ResolveEnd> {
    return fromRouterEvent(ResolveEnd, this.router);
  }

  constructor(@Inject(Router) private readonly router: Router) {}

  handleResolve(
    { path }: Pick<Route, 'path'>,
    relative = true
  ): Observable<boolean> {
    let handledPath: string | null = null;

    if (path) {
      handledPath = path;

      if (relative) {
        handledPath = `${this.router.url}/${handledPath}`;
      }
    }

    const resolveStart$ = this.resolveStart.pipe(pathBased(handledPath));
    const resolveEnd$ = this.resolveEnd.pipe(pathBased(handledPath));

    return merge(
      resolveStart$.pipe(map(TRUE_HANDLER)),
      resolveEnd$.pipe(map(FALSE_HANDLER))
    );
  }
}
