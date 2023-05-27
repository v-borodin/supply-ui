import { ElementRef } from '@angular/core';

export type SupAppearance =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'accent'
  | 'flat'
  | 'danger'
  | string
  | undefined;

export type SupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'inherit' | string | undefined;

export type SupShape = 'rounded' | 'square' | 'circle' | string | undefined;

export interface SupHasAppearance {
  appearance: SupAppearance;
}

export interface SupHasSize {
  size: SupSize;
}

export interface SupHasShape {
  shape: SupShape;
}

export interface SupHasElementRef {
  readonly elementRef: ElementRef;
}

export interface SupCustomizedElement extends SupHasAppearance, SupHasSize, SupHasShape {}

export interface SupInteractiveElement
  extends SupCanFocus,
    SupCanDisable,
    SupHasTabIndex,
    SupHasId<string> {}

export interface SupControlElement
  extends SupInteractiveElement,
    SupCanLoadable,
    SupCanReadonly,
    SupHasValidity {}

export interface SupCanDisable {
  disabled: boolean;
}

export interface SupCanFocus {
  focused: boolean;
}

export interface SupHasValidity {
  invalid: boolean;
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
  readOnly: boolean;
}
