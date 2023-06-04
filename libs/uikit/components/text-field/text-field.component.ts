import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Inject,
  Optional,
  Self,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  SUP_DATA_LIST_CONTROLLER,
  SupAbstractControl,
  SupCustomizedElement,
  SupDataListController,
  SupDomHandler,
  SupHasElementRef,
} from '@supply/cdk';
import { NgControl } from '@angular/forms';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { SupTextControlNative } from './text-control-native';
import { SUP_TEXT_FIELD_OPTIONS, SupTextFieldOptions } from './text-field.helpers';
import { SUP_LABEL, SupLabelDirective } from '../../directives';
import { SupDropdownDirective } from '../dropdown';
import { SupDataListDirective } from '../data-list';

type TextControlType = 'input' | 'textarea';

export function supGetNativeFocused({ activeElement }: Document): Element | null {
  if (!activeElement?.shadowRoot) {
    return activeElement;
  }

  let element = activeElement.shadowRoot.activeElement;

  while (element?.shadowRoot) {
    element = element.shadowRoot.activeElement;
  }

  return element;
}

export function supIsNativeFocused(node: Node | null): boolean {
  return !!node?.ownerDocument && supGetNativeFocused(node.ownerDocument) === node;
}

@Component({
  selector: 'sup-text-field',
  templateUrl: './text-field.html',
  styleUrls: ['./text-field.scss'],
  inputs: [
    'valueTransformer',
    'appearance',
    'size',
    'shape',
    'iconLeft',
    'iconRight',
    'hasClear',
    'value',
    'disabled',
    'readOnly',
    'invalid',
    'loading',
  ],
  providers: [
    {
      provide: SUP_DATA_LIST_CONTROLLER,
      useExisting: SupTextFieldComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupTextFieldComponent
  extends SupAbstractControl<string>
  implements SupCustomizedElement, SupDataListController<string>
{
  @ContentChild(SUP_LABEL, { descendants: true })
  readonly label?: SupLabelDirective;

  @ViewChild(SupDropdownDirective, { static: false })
  readonly dropdown?: SupDropdownDirective<any>;

  @ContentChild(SupDataListDirective, { read: TemplateRef })
  readonly dataList?: TemplateRef<any>;

  @ContentChild(SupTextControlNative, { static: true, descendants: true })
  private set controlType(input: SupHasElementRef) {
    if (!input) {
      console.warn(
        `[supTextInput] is required to use with '${SupTextFieldComponent.name}'`
      );
      return;
    }

    const {
      elementRef: { nativeElement },
    } = input;
    this.textControlType = SupDomHandler.isTextArea(nativeElement) ? 'textarea' : 'input';

    this.controlNativeElement = nativeElement;
  }

  textControlType?: TextControlType;

  get nativeFocusableElement(): HTMLElement | null {
    return this.disabled || !this.controlNativeElement ? null : this.controlNativeElement;
  }

  get nativeFocused(): boolean {
    return (
      supIsNativeFocused(this.nativeFocusableElement) ||
      (!!this.dropdown && this.dropdown.open)
    );
  }

  appearance = this.options.appearance;

  shape = this.options.shape;

  size = this.options.size;

  hasClear = this.options.hasClear;

  iconLeft: ReflectiveContent;

  iconRight: ReflectiveContent;

  valueTransformer: (value: string) => string = value => value;

  private controlNativeElement: HTMLElement | null = null;

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    control: NgControl | null,
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(SUP_TEXT_FIELD_OPTIONS) private readonly options: SupTextFieldOptions
  ) {
    super(control, elementRef);
  }

  handleOption(value: string): void {
    this.value = this.valueTransformer(value);
    this.dropdown?.toggle(false);
  }

  onValueChange(value: string): void {
    this.value = value;

    if (this.dataList) {
      this.dropdown?.toggle(true);
    }
  }

  focusField(preventScroll = false): void {
    if (this.nativeFocusableElement) {
      this.nativeFocusableElement.focus({ preventScroll });
    }
  }

  protected getFallbackValue(): string {
    return '';
  }

  @HostListener('focusin', ['true'])
  @HostListener('focusout', ['false'])
  private onFocus(focused: boolean): void {
    this.focused = focused && this.nativeFocused;
  }
}
