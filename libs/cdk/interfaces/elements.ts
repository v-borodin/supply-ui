import { ElementRef } from '@angular/core';

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

export interface SupCustomizedElement
  extends SupHasAppearance,
    SupHasSize,
    SupHasShape {}

export interface SupHasElementRef {
  readonly elementRef: ElementRef;
}

export type SupClassChanges = {
  readonly current: string;

  readonly previous: string;
};

export interface SupManipulativeElement extends SupHasElementRef {
  toggleClass(className: string, force: boolean): void;

  changeClass(changes: SupClassChanges): void;

  setAttribute(attributeName: string, value: string): void;
}

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
