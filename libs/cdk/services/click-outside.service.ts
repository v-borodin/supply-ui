import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SupClickOutsideHandler extends Observable<Event> {
  constructor(
    @Inject(ElementRef) { nativeElement }: ElementRef,
    @Inject(DOCUMENT) document: Document,
    @Inject(Renderer2) renderer: Renderer2
  ) {
    let listenerFn: () => void;

    super(subscriber => {
      listenerFn = renderer.listen(document, `click`, event => {
        if (!nativeElement.contains(event.target)) {
          subscriber.next(event);
        }
      });
    });

    return this.pipe(finalize(() => listenerFn()));
  }
}
