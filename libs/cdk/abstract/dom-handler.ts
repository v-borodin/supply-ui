import { SupPrefixed } from '@supply/cdk/types';

export abstract class SupDomHandler {
  static isTextArea(element: HTMLElement): boolean {
    return element instanceof HTMLTextAreaElement;
  }

  static setAttribute(element: Element, attributeName: string, value: string): void {
    element.setAttribute(attributeName, value);
  }

  static toggleClass(element: Element, className: SupPrefixed, force: boolean): void {
    element.classList.toggle(className, force);
  }

  static updateClass(
    element: Element,
    { current, previous }: { current: SupPrefixed; previous: SupPrefixed }
  ): void {
    if (current === previous) {
      return;
    }

    if (previous) {
      element.classList.remove(previous);
    }

    if (current) {
      element.classList.add(current);
    }
  }
}
