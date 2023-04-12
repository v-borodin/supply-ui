import { ElementRef } from '@angular/core';

export type SupAppearance =
  | 'primary'
  | 'secondary'
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

export interface SupCustomizedElement
  extends SupHasAppearance,
    SupHasSize,
    SupHasShape {}

export type SupClassChanges = {
  readonly current: string;

  readonly previous: string;
};

export interface SupCanAlterable {
  readonly elementRef: ElementRef;

  toggleClass(className: string, toggle: boolean): void;

  changeClass(changes: SupClassChanges): void;

  setAttribute(attributeName: string, value: string): void;
}

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

export interface SupHasId {
  id: string;
}

export interface SupInteractiveElement
  extends SupCanFocus,
    SupCanDisable,
    SupHasTabIndex,
    SupHasId {}

export interface SupCanLoadable {
  loading: boolean;
}

export interface SupCanReadonly {
  readonly: boolean;
}
