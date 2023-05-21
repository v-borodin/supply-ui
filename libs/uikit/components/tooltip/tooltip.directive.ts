import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  OriginConnectionPosition,
  Overlay,
  OverlayConnectionPosition,
  OverlayRef,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directionality } from '@angular/cdk/bidi';
import {
  SupCanDisable,
  supCoerceBooleanProperty,
  SupDestroyService,
  SupFocusTracker,
  SupImplicitBoolean,
} from '@supply/cdk';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { Observable, takeUntil } from 'rxjs';
import { SUP_TOOLTIP_HOST, SupAbstractTooltipOptions } from './tooltip.helpers';

@Directive({
  selector: '[supTooltip]:not(ng-container)',
  inputs: ['content: supTooltip'],
  providers: [SupDestroyService],
})
export class SupTooltipDirective<TContext>
  extends SupAbstractTooltipOptions
  implements OnChanges, AfterViewInit, OnDestroy, SupCanDisable
{
  @Input()
  show = false;

  @Output()
  readonly showChange = new EventEmitter<boolean>();

  @Input('supTooltipDisabled')
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: SupImplicitBoolean) {
    this._disabled = supCoerceBooleanProperty(value);
  }

  content: ReflectiveContent<TContext> = null;

  get overlayElement(): HTMLElement | null {
    return this.overlayRef?.overlayElement ?? null;
  }

  get triggerElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  private overlayRef: OverlayRef | null = null;

  private _disabled = false;

  constructor(
    @Inject(SUP_TOOLTIP_HOST) private readonly tooltipHost: Type<unknown>,
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(NgZone) private readonly ngZone: NgZone,
    @Inject(SupFocusTracker) private readonly focusTracker: SupFocusTracker,
    @Inject(SupDestroyService) private readonly destroy$: Observable<void>,
    @Inject(Overlay) private readonly overlay: Overlay,
    @Inject(Directionality) private readonly directionality: Directionality,
    @Inject(ChangeDetectorRef) private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(ViewContainerRef) private readonly vcr: ViewContainerRef,
  ) {
    super();
  }

  ngOnChanges(): void {
    if (!this.content) {
      this.toggle(false);
    }
  }

  ngAfterViewInit(): void {
    this.focusTracker
      .track(this.elementRef.nativeElement)
      .pipe(takeUntil(this.destroy$))
      .subscribe(origin => {
        if (!origin) {
          this.ngZone.run(() => this.toggle(false));
        } else if (origin === 'keyboard') {
          this.ngZone.run(() => this.toggle(true));
        }
      });
  }

  ngOnDestroy(): void {
    this.toggle(false);
  }

  toggle(show: boolean): void {
    if (show && this.content && !this.overlayRef) {
      this.showTooltip();
    } else if (!show && this.overlayRef) {
      this.hideTooltip();
    }
    this.changeDetectorRef.markForCheck();
  }

  showTooltip(origin?: { x: number; y: number }): void {
    if (this.disabled) {
      return;
    }

    const overlayRef = this.createOverlay(origin);
    this.detach();

    const tooltipPortal = new ComponentPortal(this.tooltipHost, this.vcr);

    overlayRef.attach(tooltipPortal);
    this.show = true;
    this.showChange.emit(this.show);
  }

  hideTooltip(): void {
    this.detach();
    this.show = false;
    this.showChange.emit(this.show);

    this.overlayRef = null;
  }

  private createOverlay(origin?: { x: number; y: number }): OverlayRef {
    const strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.positionAtOrigin ? origin || this.elementRef : this.elementRef)
      .withFlexibleDimensions(false)
      .withViewportMargin(this.viewportMargin);

    this.overlayRef = this.overlay.create({
      direction: this.directionality,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: strategy,
    });

    this.updatePosition(this.overlayRef);

    this.overlayRef
      .detachments()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.detach());

    return this.overlayRef;
  }

  private updatePosition(overlayRef: OverlayRef) {
    const position = overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
    const origin = this.getOrigin();
    const overlay = this.getOverlayPosition();

    position.withPositions([
      this.addOffset({ ...origin.main, ...overlay.main }),
      this.addOffset({ ...origin.fallback, ...overlay.fallback }),
    ]);
  }

  private getOrigin(): {
    main: OriginConnectionPosition;
    fallback: OriginConnectionPosition;
  } {
    const isLtr = !this.directionality || this.directionality.value == 'ltr';
    const position = this.position;
    let originPosition: OriginConnectionPosition;

    if (position == 'above' || position == 'below') {
      originPosition = { originX: 'center', originY: position == 'above' ? 'top' : 'bottom' };
    } else if (
      position == 'before' ||
      (position == 'left' && isLtr) ||
      (position == 'right' && !isLtr)
    ) {
      originPosition = { originX: 'start', originY: 'center' };
    } else if (
      position == 'after' ||
      (position == 'right' && isLtr) ||
      (position == 'left' && !isLtr)
    ) {
      originPosition = { originX: 'end', originY: 'center' };
    }

    const { x, y } = this.invertPosition(originPosition!.originX, originPosition!.originY);

    return {
      main: originPosition!,
      fallback: { originX: x, originY: y },
    };
  }

  private getOverlayPosition(): {
    main: OverlayConnectionPosition;
    fallback: OverlayConnectionPosition;
  } {
    const isLtr = !this.directionality || this.directionality.value == 'ltr';
    const position = this.position;
    let overlayPosition: OverlayConnectionPosition;

    if (position == 'above') {
      overlayPosition = { overlayX: 'center', overlayY: 'bottom' };
    } else if (position == 'below') {
      overlayPosition = { overlayX: 'center', overlayY: 'top' };
    } else if (
      position == 'before' ||
      (position == 'left' && isLtr) ||
      (position == 'right' && !isLtr)
    ) {
      overlayPosition = { overlayX: 'end', overlayY: 'center' };
    } else if (
      position == 'after' ||
      (position == 'right' && isLtr) ||
      (position == 'left' && !isLtr)
    ) {
      overlayPosition = { overlayX: 'start', overlayY: 'center' };
    }

    const { x, y } = this.invertPosition(overlayPosition!.overlayX, overlayPosition!.overlayY);

    return {
      main: overlayPosition!,
      fallback: { overlayX: x, overlayY: y },
    };
  }

  private addOffset(position: ConnectedPosition): ConnectedPosition {
    const offset = this.offset;
    const isLtr = !this.directionality || this.directionality.value == 'ltr';

    if (position.originY === 'top') {
      position.offsetY = -offset;
    } else if (position.originY === 'bottom') {
      position.offsetY = offset;
    } else if (position.originX === 'start') {
      position.offsetX = isLtr ? -offset : offset;
    } else if (position.originX === 'end') {
      position.offsetX = isLtr ? offset : -offset;
    }

    return position;
  }

  private invertPosition(x: HorizontalConnectionPos, y: VerticalConnectionPos) {
    if (this.position === 'above' || this.position === 'below') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else {
      if (x === 'end') {
        x = 'start';
      } else if (x === 'start') {
        x = 'end';
      }
    }

    return { x, y };
  }

  private detach(): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
