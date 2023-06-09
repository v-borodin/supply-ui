import { SupImplicitNumber } from '@supply/cdk/utils';

export function supToPx(value: SupImplicitNumber): string {
  const converted = Number(value);
  console.assert(Number.isFinite(converted), `Value must be finite number`);
  return `${converted}px`;
}
