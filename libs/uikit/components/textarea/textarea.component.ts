import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
} from '@angular/core';
import {
  supMixinCustomized,
  supMixinInteractive,
  supMixinInvalid,
  supMixinLoadable,
  supMixinReadonly,
} from '@supply/cdk';
import { SUP_TEXTAREA_OPTIONS, SupTextareaOptions } from './textarea.helpers';

const TextAreaMixin = supMixinInteractive(
  supMixinInvalid(
    supMixinReadonly(
      supMixinLoadable(
        supMixinCustomized(
          class {
            constructor(readonly elementRef: ElementRef) {}
          },
        ),
      ),
    ),
  ),
);

export const LINE_HEIGHT_M = 24;
export const LINE_HEIGHT_L = 24;

@Component({
  selector: 'sup-textarea',
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.scss'],
  inputs: [
    'value',
    'disabled',
    'readOnly',
    'invalid',
    'loading',
    'appearance',
    'size',
    'shape',
    'hasClear',
    'rows',
    'maxLength',
    'expandable',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupTextareaComponent extends TextAreaMixin {
  @HostBinding('class.expandable')
  expandable = false;

  override appearance = this.options.appearance;

  override size = this.options.size;

  override shape = this.options.shape;

  rows = this.options.defaultRows;

  maxLength: number | null = null;

  value = '';

  get computeMaxHeight(): number | null {
    return this.expandable ? this.rows * this.lineHeight : null;
  }

  private get lineHeight(): number {
    return this.size === 'md' ? LINE_HEIGHT_M : LINE_HEIGHT_L;
  }

  constructor(
    @Inject(SUP_TEXTAREA_OPTIONS) private readonly options: SupTextareaOptions,
    @Inject(ElementRef) elementRef: ElementRef,
  ) {
    super(elementRef);
  }

  @HostListener('focusin', ['true'])
  @HostListener('focusout', ['false'])
  onFocused(focused: boolean): void {
    this.focused = focused;
  }

  onValueChange(value: string): void {
    this.value = value;
  }
}
