import { SupCanDisable, SupCanReadonly, SupHasId } from './elements';

type InputMode =
  | 'decimal'
  | 'email'
  | 'none'
  | 'numeric'
  | 'search'
  | 'tel'
  | 'text'
  | 'url';

export interface SupInputAccessor<TValue = string>
  extends SupCanDisable,
    SupCanReadonly,
    SupHasId<string> {
  readonly inputMode: InputMode;

  readonly invalid: boolean;

  readonly value: TValue;

  onValueChange(value: TValue): void;
}
