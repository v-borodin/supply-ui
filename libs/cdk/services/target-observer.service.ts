import { Inject, Injectable } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  of,
  repeat,
  share,
  startWith,
  switchMap,
  take,
  takeUntil,
  timer,
} from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SupTargetObserver {
  get activeTarget(): Observable<EventTarget | null> {
    return merge(
      this.computedFocusin,
      this.focusLost,
      this.focusMouse,
      this.iframe
    ).pipe(distinctUntilChanged(), share());
  }

  private readonly focusin$: Observable<Event>;

  private readonly focusout$: Observable<Event>;

  private readonly mousedown$: Observable<Event>;

  private readonly mouseup$: Observable<Event>;

  private readonly blur$: Observable<Event>;

  private get computedFocusin(): Observable<EventTarget | null> {
    return this.focusin$.pipe(
      switchMap(event => {
        const target = this.getActualTarget(event);
        const root = this.getDocumentOrShadowRoot(target as Node);

        return root === this.document || !root
          ? of(target)
          : this.getShadowRootActiveElement(root).pipe(startWith(target));
      })
    );
  }

  private get focusLost(): Observable<EventTarget | null> {
    return this.focusout$.pipe(
      takeUntil(this.mousedown$),
      repeat({ delay: () => this.mouseup$ }),
      map(({ target }) => target)
    );
  }

  private get focusMouse(): Observable<EventTarget | null> {
    return this.mousedown$.pipe(
      switchMap(({ target }) =>
        this.document.activeElement === this.document.body
          ? of(target)
          : this.focusout$.pipe(
              take(1),
              takeUntil(timer(0)),
              map(() => target)
            )
      )
    );
  }

  private get iframe(): Observable<EventTarget | null> {
    return this.blur$.pipe(
      map(() => this.document.activeElement),
      filter(element => !!element && element.matches('iframe'))
    );
  }

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    const window = this.document.defaultView;

    if (!window) {
      throw new Error('Window is not available');
    }

    this.focusin$ = fromEvent(window, 'focusin');
    this.focusout$ = fromEvent(window, 'focusout');
    this.mousedown$ = fromEvent(window, 'mousedown');
    this.mouseup$ = fromEvent(window, 'mouseup');
    this.blur$ = fromEvent(window, 'blur');
  }

  private getShadowRootActiveElement(
    root: Node
  ): Observable<EventTarget | null> {
    return merge(
      fromEvent(root, 'focusin').pipe(map(({ target }) => target)),
      fromEvent(root, 'focusout').pipe(map(({ target }) => target))
    );
  }

  private getActualTarget(event: Event): EventTarget {
    return event.composedPath()[0];
  }

  private getDocumentOrShadowRoot(node: Node): Node | null {
    return node.isConnected ? node.getRootNode() : node.ownerDocument;
  }
}
