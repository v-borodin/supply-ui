export type SupAppearance =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'accent'
  | 'flat'
  | string
  | undefined;

export type SupSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | string
  | undefined;

export type SupShape = 'rounded' | 'square' | 'circle' | undefined;

export interface SupHasAppearance {
  appearance: SupAppearance;
}

export interface SupHasSize {
  size: SupSize;
}

export interface SupHasShape {
  shape: SupShape;
}

export interface SupElement {
  readonly element: Element;
}

export interface SupCustomizedElement
  extends SupHasAppearance,
    SupHasSize,
    SupHasShape {}

export interface SupInteractiveElement
  extends SupCanFocus,
    SupCanDisable,
    SupHasTabIndex,
    SupHasId<string> {}

export interface SupCanDisable {
  disabled: boolean;
}

export interface SupCanFocus {
  focused: boolean;
}

export interface SupHasTabIndex {
  tabIndex: number;

  defaultTabIndex: number;
}

export interface SupHasId<T> {
  id: T;
}

export interface SupCanLoadable {
  loading: boolean;
}

export interface SupCanReadonly {
  readonly: boolean;
}
