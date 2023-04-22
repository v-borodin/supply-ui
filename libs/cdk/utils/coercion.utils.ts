export type SupImplicitNumber = string | number | null | undefined;

export type SupImplicitBoolean = string | boolean | null | undefined;

export function coerceNumberProperty(value: any, fallbackValue = 0) {
  return _isNumberValue(value) ? Number(value) : fallbackValue;
}

export function _isNumberValue(value: any): boolean {
  return !isNaN(parseFloat(value as any)) && !isNaN(Number(value));
}

export function supCoerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}
