import { Directive, ElementRef, Inject, Input, Self } from '@angular/core';
import { Observable, takeUntil, timer } from 'rxjs';
import { SupDestroyService } from '../services';

export const SUP_SCROLL_INTO_VIEW = 'scrollIntoView';

@Directive({
  selector: '[supScrollIntoView]',
  providers: [SupDestroyService],
  standalone: true,
})
export class SupScrollIntoViewDirective {
  @Input()
  set supScrollIntoView(scroll: boolean) {
    if (!scroll) {
      return;
    }

    timer(0)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.elementRef.nativeElement.dispatchEvent(
          new CustomEvent<Element>(SUP_SCROLL_INTO_VIEW, {
            bubbles: true,
            detail: this.elementRef.nativeElement,
          })
        );
      });
  }

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef,
    @Self()
    @Inject(SupDestroyService)
    private readonly destroy$: Observable<void>
  ) {}
}
