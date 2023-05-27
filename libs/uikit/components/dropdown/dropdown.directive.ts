import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injector,
  INJECTOR,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { merge, Observable, takeUntil } from 'rxjs';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { SupAbstractDropdownOptions } from './dropdown.helpers';
import { SUP_DROPDOWN_HOST } from './dropdown.component';

@Directive({
  selector: '[supDropdown]',
  exportAs: 'supDropdown',
  inputs: ['content: supDropdown'],
})
export class SupDropdownDirective<TContext>
  extends SupAbstractDropdownOptions
  implements OnChanges, OnDestroy
{
  @Input()
  set open(show: boolean) {
    this._open = show;
    this.toggle(show);
  }

  get open(): boolean {
    return this._open;
  }

  @Output()
  readonly openChange = new EventEmitter<boolean>();

  content: ReflectiveContent<TContext> = null;

  private overlayRef: OverlayRef | null = null;

  private _open = false;

  constructor(
    @Inject(SUP_DROPDOWN_HOST) private readonly dropdownHost: Type<unknown>,
    @Inject(INJECTOR) private readonly injector: Injector,
    @Inject(Overlay) private readonly overlay: Overlay,
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(ViewContainerRef) private readonly vcr: ViewContainerRef,
  ) {
    super();
  }

  ngOnDestroy() {
    this.toggle(false);
  }

  ngOnChanges(): void {
    if (!this.content) {
      this.toggle(false);
    }
  }

  toggle(show: boolean): void {
    if (show && this.content && !this.overlayRef) {
      this.createDropdown();
    } else if (!show && this.overlayRef) {
      this.destroyDropdown();
      this.overlayRef = null;
    }
  }

  @HostListener('click')
  private toggleDropdown(): void {
    this.toggle(!this._open);
  }

  private createDropdown(): void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            ...this,
          },
        ]),
      minWidth: this.triggerWidth,
      maxWidth: this.maxWidth === 'triggerWidth' ? this.triggerWidth : this.maxWidth,
    });

    const componentPortal = new ComponentPortal(
      this.dropdownHost,
      this.vcr,
      Injector.create({
        parent: this.injector,
        providers: [
          {
            provide: OverlayRef,
            useValue: this.overlayRef,
          },
        ],
      }),
    );

    this._open = true;
    this.openChange.emit(this._open);
    this.overlayRef.attach(componentPortal);

    this.dropdownClosingActions(this.overlayRef)
      .pipe(takeUntil(this.openChange))
      .subscribe(() => {
        this.toggle(false);
      });
  }

  private destroyDropdown(): void {
    if (!this.overlayRef || !this.content) {
      return;
    }

    this._open = false;
    this.openChange.emit(this._open);
    this.overlayRef.detach();
  }

  private dropdownClosingActions(overlayRef: OverlayRef): Observable<MouseEvent | void> {
    const backdropClick$ = overlayRef.backdropClick();
    const detachment$ = overlayRef.detachments();

    return merge(backdropClick$, detachment$);
  }

  private get triggerWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }
}
