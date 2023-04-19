export function supIsNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function supIsString(value: unknown): value is string {
  return typeof value === 'string';
}

export function supIsObject(value: unknown): value is object {
  return typeof value === 'object';
}

export function supIsFunction(
  value: unknown
): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function supIsNativeDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function supIsPromise(value: any): value is PromiseLike<any> {
  return supIsFunction(value?.then);
}

export function supIsHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}
