export type SupImplicitBoolean = string | boolean | null | undefined;

export function supCoerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}
