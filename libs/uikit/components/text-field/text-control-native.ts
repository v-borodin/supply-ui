import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Inject,
} from '@angular/core';
import {
  SUP_INPUT_ACCESSOR,
  SupIdGeneratorStrategy,
  SupInputAccessor,
  SupPrefixed,
} from '@supply/cdk';

@Component({
  selector: 'input[supTextInput], textarea[supTextInput]',
  exportAs: 'supTextInput',
  template: '',
  styleUrls: ['./native-control.scss'],
  inputs: ['autofocus'],
  host: {
    type: 'text',
    '[attr.id]': 'id',
    '[attr.inputMode]': 'inputMode',
    '[attr.aria-invalid]': 'accessor.invalid',
    '[attr.disabled]': 'accessor.disabled || null',
    // @TODO: resolve tabindex
    // '[tabIndex]': 'accessor.focusable ? 0 : -1',
    '[readOnly]': 'accessor.readOnly',
    '[value]': 'accessor.value',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SupTextControlNative<TValue = string> implements AfterViewInit {
  autofocus = false;

  get id(): string {
    return this.elementRef.nativeElement.id || this.accessor.id || this.idGenerator.generate();
  }

  get inputMode(): string {
    return this.elementRef.nativeElement.inputMode || this.accessor.inputMode;
  }

  constructor(
    @Inject(SUP_INPUT_ACCESSOR) readonly accessor: SupInputAccessor<TValue>,
    @Inject(ElementRef) private readonly elementRef: ElementRef,
    @Inject(SupIdGeneratorStrategy) private idGenerator: SupIdGeneratorStrategy<SupPrefixed>,
  ) {}

  ngAfterViewInit(): void {
    if (this.autofocus) {
      this.elementRef.nativeElement.focus();
    }
  }

  @HostListener('input', ['$event.target.value'])
  private onValueChange(value: TValue): void {
    this.accessor.onValueChange(value);
  }
}
