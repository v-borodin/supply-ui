export abstract class SupDomHandler {
  static setAttribute(
    element: Element,
    attributeName: string,
    value: string
  ): void {
    element.setAttribute(attributeName, value);
  }

  static toggleClass(
    element: Element,
    className: string,
    force: boolean
  ): void {
    element.classList.toggle(className, force);
  }

  static changeClass<T extends string>(
    element: Element,
    { current, previous }: { current: T; previous: T }
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
