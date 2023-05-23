import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import {
  RadioButtonComponent,
  SUP_RADIO,
} from './radio-button/radio-button.component';
import { SupFieldSimpleDirective } from '@supply/cdk';
import { NgForOf, NgTemplateOutlet } from '@angular/common';

export type SupRadioType = 'default' | 'block';

@Component({
  selector: 'sup-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  host: {
    class: 'radio-group',
  },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, NgForOf],
})
export class RadioGroupComponent
  extends SupFieldSimpleDirective
  implements ControlValueAccessor, AfterContentInit
{
  @ContentChildren(SUP_RADIO, { descendants: false })
  radios?: QueryList<RadioButtonComponent>;

  @Input()
  type: SupRadioType = `default`;

  @Input()
  @HostBinding(`class`)
  direction = `horizontal`;

  private innerValue: any;

  get value(): any {
    return this.innerValue;
  }

  constructor() {
    super(true);
  }

  override ngAfterContentInit() {
    super.ngAfterContentInit();
    this.resolveInitialCheckedValue();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if (this.innerValue !== value) {
      this.innerValue = value;
    }
  }

  resolveInitialCheckedValue(): void {
    const checkedValue = this.radios
      ?.toArray()
      .find(radio => radio.checked)?.value;

    if (!checkedValue) {
      return;
    }

    this.select(checkedValue);
  }

  public select(value: any) {
    this.innerValue = value;
    this.onChange(value);
  }

  public onChangeEvent(event: Event): void {
    event.stopPropagation();
  }

  private onChange: (value: any) => void = () => {};

  private onTouched: any = () => {};
}
