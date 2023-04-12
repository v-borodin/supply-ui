import { ElementRef, inject, Renderer2 } from '@angular/core';
import { SupClassChanges, SupCanAlterable } from '@supply/cdk/interfaces';

export abstract class SupAbstractElementBinder implements SupCanAlterable {
  readonly elementRef = inject(ElementRef);

  private readonly renderer = inject(Renderer2);

  private get nativeElement(): Element {
    return this.elementRef.nativeElement;
  }

  setAttribute(attributeName: string, value: string): void {
    this.renderer.setAttribute(this.nativeElement, attributeName, value);
  }

  toggleClass(className: string, toggle: boolean): void {
    this.renderer[toggle ? 'addClass' : 'removeClass'](
      this.nativeElement,
      className
    );
  }

  changeClass({ current, previous }: SupClassChanges): void {
    if (current === previous) {
      return;
    }

    const { nativeElement, renderer } = this;

    if (previous) {
      renderer.removeClass(nativeElement, previous);
    }

    if (current) {
      renderer.addClass(nativeElement, current);
    }
  }
}
