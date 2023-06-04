import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  SupDestroyService,
  SupFocusTracker,
  supMixinControl,
  supMixinCustomized,
} from '@supply/cdk';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { SupTextInputOptions, SUP_INPUT_OPTIONS } from './input.helpers';

const InputMixin = supMixinControl(
  supMixinCustomized(
    class {
      constructor(readonly elementRef: ElementRef) {}
    },
  ),
);

@Component({
  selector: 'sup-input',
  templateUrl: './input.html',
  styleUrls: ['./input.scss'],
  inputs: [
    'value',
    'disabled',
    'readOnly',
    'editable',
    'invalid',
    'loading',
    'appearance',
    'size',
    'shape',
    'iconLeft',
    'iconRight',
    'hasClear',
  ],
  outputs: ['valueChange'],
  providers: [SupDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupInputComponent extends InputMixin {
  override appearance = this.options.appearance;

  override size = this.options.size;

  override shape = this.options.shape;

  hasClear = this.options.hasClear;

  iconLeft: ReflectiveContent = '';

  iconRight: ReflectiveContent = '';

  value = '';

  readonly valueChange = new EventEmitter<string>();

  editable = true;

  get focusable(): boolean {
    return !this.disabled && this.focused;
  }

  get isEmpty(): boolean {
    return !this.value;
  }

  get showClear(): boolean {
    return this.hasClear && !this.isEmpty && !this.readOnly && !this.disabled && !this.loading;
  }

  @HostBinding('attr.data-icons-left')
  private get iconsLeftCounter(): number {
    return this.iconLeft ? 1 : 0;
  }

  @HostBinding('attr.data-icons-right')
  private get iconsRightCounter(): number {
    let count = 0;

    this.showClear && count++;
    (!!this.iconRight || this.loading) && count++;

    return count;
  }

  constructor(
    @Inject(SUP_INPUT_OPTIONS) private readonly options: SupTextInputOptions,
    @Inject(SupFocusTracker) private readonly focusTracker: SupFocusTracker,
    @Inject(SupDestroyService) private readonly destroy$: Observable<void>,
    @Inject(ElementRef) elementRef: ElementRef,
  ) {
    super(elementRef);
  }

  @HostListener('focusin', ['true'])
  @HostListener('focusout', ['false'])
  onFocused(focused: boolean): void {
    this.focused = focused;
  }

  clear(event?: Event): void {
    event && event.stopPropagation();
    this.updateValue('');
  }

  onValueChange(value: string): void {
    this.updateValue(value);
  }

  private updateValue(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
