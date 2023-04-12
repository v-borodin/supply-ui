import { SupShape, SupSize } from '@supply/cdk';

type UnsupportedSizes = 'xs' | 'lg' | 'xl' | 'xxl';
export type SupInputSize = Exclude<SupSize, UnsupportedSizes>;

type UnsupportedShape = 'circle';
export type SupInputShape = Exclude<SupShape, UnsupportedShape>;

export interface SupTextInputOptions {
  readonly size?: SupInputSize;

  readonly shape?: SupInputShape;
}

const supTextInputDefaultOptions: Required<SupTextInputOptions> = {
  size: 'md',

  shape: 'rounded',
};
