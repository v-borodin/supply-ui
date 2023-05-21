import { AfterViewInit, Directive, forwardRef, Inject, Input, Self } from '@angular/core';
import { falseEmitter, SupDestroyService, supIsElement, trueEmitter } from '@supply/cdk';
import { delay, filter, fromEvent, merge, Observable, of, switchMap, takeUntil } from 'rxjs';
import { SUP_TOOLTIP_OPTIONS, SupTooltipOptions } from './tooltip.helpers';
import { SupTooltipDirective } from './tooltip.directive';

@Directive({
  selector: '[supTooltip]:not(ng-container)',
  exportAs: 'supTooltipHover',
})
export class SupTooltipHoverDirective<TContext>
  implements AfterViewInit, Pick<SupTooltipOptions, 'showDelay' | 'hideDelay'>
{
  @Input('supTooltipShowDelay')
  showDelay = this.options.showDelay;

  @Input('supTooltipHideDelay')
  hideDelay = this.options.hideDelay;

  private get overlayElement(): HTMLElement | null {
    return this.controller.overlayElement;
  }

  private get triggerElement(): HTMLElement {
    return this.controller.triggerElement;
  }

  constructor(
    @Inject(forwardRef(() => SupTooltipDirective))
    private readonly controller: SupTooltipDirective<TContext>,
    @Self() @Inject(SupDestroyService) private readonly destroy$: Observable<void>,
    @Inject(SUP_TOOLTIP_OPTIONS) private readonly options: SupTooltipOptions,
  ) {}

  ngAfterViewInit(): void {
    merge(
      fromEvent(this.triggerElement, 'mouseenter').pipe(trueEmitter()),
      fromEvent<MouseEvent>(this.triggerElement, 'mouseleave').pipe(
        filter(event => !this.leaveToOverlay(event)),
        falseEmitter(),
      ),
    )
      .pipe(
        switchMap(visible => of(visible).pipe(delay(visible ? this.showDelay : this.hideDelay))),
        takeUntil(this.destroy$),
      )
      .subscribe(visible => this.toggle(visible));
  }

  private leaveToOverlay({ relatedTarget }: MouseEvent): boolean {
    return (
      !!this.overlayElement &&
      supIsElement(relatedTarget) &&
      this.overlayElement.contains(relatedTarget)
    );
  }

  private toggle(show: boolean): void {
    this.controller.toggle(show);
  }
}
