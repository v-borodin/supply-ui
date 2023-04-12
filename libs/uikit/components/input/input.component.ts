import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  Optional,
  Self,
} from '@angular/core';
import {
  SupAbstractElementBinder,
  supCoerceBooleanProperty,
  SupImplicitBoolean,
  supMixinInteractive,
  supMixinSize,
} from '@supply/cdk';
import {
  SUP_INPUT_VALUE_ACCESSOR,
  SupInputValueAccessor,
} from '@supply/uikit/interfaces';
import { supMixinReadonly } from '@supply/cdk/mixins/readonly.mixin';
import { SupInputModel } from '@supply/uikit/components';
import { NgControl, Validators } from '@angular/forms';

const SupInputMixin = supMixinReadonly(
  supMixinInteractive(supMixinSize(SupAbstractElementBinder)),
  false
);

@Component({
  selector: 'input[supInput], textarea[supInput]',
  template: '',
  styleUrls: ['./input.scss'],
  inputs: ['id', 'disabled', 'size'],
  host: {
    '[id]': 'id',
    '[disabled]': 'disabled',
    '[attr.id]': 'id',
    '[attr.readonly]': 'readonly || null',
    '[attr.name]': 'name || null',
    '[value]': 'valueAccessor.value',
  },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupInputComponent extends SupInputMixin implements SupInputModel {
  @Input()
  name: string | null = null;

  // @Input()
  // override size: SupInputSize = 'md';

  @Input()
  get required(): boolean {
    return (
      this._required ??
      this.ngControl?.control?.hasValidator(Validators.required) ??
      false
    );
  }

  set required(value: SupImplicitBoolean) {
    this._required = supCoerceBooleanProperty(value);
  }

  get value(): string {
    return this.valueAccessor.value;
  }

  readonly valueAccessor: SupInputValueAccessor<any>;

  private _required?: boolean;

  constructor(
    @Inject(ElementRef)
    elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    @Optional()
    @Inject(SUP_INPUT_VALUE_ACCESSOR)
    hostAccessor: SupInputValueAccessor<any>,
    @Optional() @Self() private ngControl: NgControl
  ) {
    super();

    const { nativeElement } = elementRef;
    this.valueAccessor = hostAccessor || nativeElement;
  }

  clear(): void {
    this.valueAccessor.value = '';
  }
}
