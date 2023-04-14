import { ElementRef, inject } from '@angular/core';
import {
  SupClassChanges,
  SupManipulativeElement,
} from '@supply/cdk/interfaces';

export abstract class SupAbstractElement implements SupManipulativeElement {
  readonly elementRef = inject(ElementRef);

  private get nativeElement(): Element {
    return this.elementRef.nativeElement;
  }

  setAttribute(attributeName: string, value: string): void {
    this.nativeElement.setAttribute(attributeName, value);
  }

  toggleClass(className: string, force: boolean): void {
    this.nativeElement.classList.toggle(className, force);
  }

  changeClass({ current, previous }: SupClassChanges): void {
    if (current === previous) {
      return;
    }

    if (previous) {
      this.nativeElement.classList.remove(previous);
    }

    if (current) {
      this.nativeElement.classList.add(current);
    }
  }
}
