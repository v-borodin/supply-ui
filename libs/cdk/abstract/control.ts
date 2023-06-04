import {
  Directive,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectorRef,
  Optional,
  ElementRef,
  Inject,
} from '@angular/core';
import { ControlValueAccessor, NgControl, NgModel } from '@angular/forms';
import { merge, Subject, takeUntil } from 'rxjs';
import { supMixinControl } from '../mixins';

const MixinControlElement = supMixinControl(
  class {
    constructor(readonly elementRef: ElementRef) {}
  }
);

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const EMPTY_FUNCTION: (...args: any[]) => void = () => {};

@Directive()
export abstract class SupAbstractControl<TValue>
  extends MixinControlElement
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private previousInternalValue?: TValue | null;

  private onTouched = EMPTY_FUNCTION;

  private onChange = EMPTY_FUNCTION;

  private readonly cdr = inject(ChangeDetectorRef);

  get value(): TValue {
    return this.previousInternalValue ?? this.fallbackValue;
  }

  set value(value: TValue) {
    this.updateValue(value);
  }

  get safeCurrentValue(): TValue {
    return this.rawValue ?? this.fallbackValue;
  }

  get computedName(): string | null {
    return this.controlName?.toString() ?? null;
  }

  get controlTouched(): boolean {
    return this.safeNgControlData<boolean>(({ touched }) => touched, false);
  }

  get controlInvalid(): boolean {
    return this.safeNgControlData<boolean>(({ invalid }) => invalid, false);
  }

  override get invalid(): boolean {
    return this.controlInvalid && this.controlTouched;
  }

  protected readonly fallbackValue = this.getFallbackValue();

  protected readonly destroy$ = new Subject<void>();

  protected abstract getFallbackValue(): TValue;

  protected get controlName(): string | null {
    return this.ngControl?.name?.toString() ?? null;
  }

  private get rawValue(): TValue | undefined {
    const { ngControl } = this;

    if (ngControl === null) {
      return undefined;
    }

    const controlValue =
      ngControl instanceof NgModel && this.previousInternalValue === undefined
        ? ngControl.viewModel
        : ngControl.value;

    return this.fromControlValue(controlValue);
  }

  constructor(
    @Optional()
    private readonly ngControl: NgControl | null,
    @Inject(ElementRef) elementRef: ElementRef
  ) {
    super(elementRef);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (!this.ngControl?.valueChanges || !this.ngControl?.statusChanges) {
      return;
    }

    merge(this.ngControl.valueChanges, this.ngControl.statusChanges)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.refreshLocalValue(this.safeCurrentValue));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  registerOnChange(onChange: (value: TValue | unknown) => void): void {
    this.onChange = (componentValue: TValue) => {
      onChange(this.toControlValue(componentValue));
    };
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  writeValue(value: TValue | null): void {
    const controlValue =
      this.ngControl instanceof NgModel && this.previousInternalValue === undefined
        ? this.ngControl.model
        : value;

    this.refreshLocalValue(this.fromControlValue(controlValue));
  }

  checkControlUpdate(): void {
    this.cdr.markForCheck();
  }

  // override updateFocusState(focused: boolean) {
  //   if (!focused) {
  //     this.controlMarkAsTouched();
  //   }
  //
  //   super.updateFocusState(focused);
  // }

  protected updateValue(value: TValue): void {
    if (this.disabled || this.valueIdenticalComparator(this.value, value)) {
      return;
    }

    this.previousInternalValue = value;
    this.controlSetValue(value);
  }

  protected valueIdenticalComparator(oldValue: TValue, newValue: TValue): boolean {
    return oldValue === newValue;
  }

  private controlSetValue(value: TValue): void {
    this.onChange(value);
    this.checkControlUpdate();
  }

  private controlMarkAsTouched(): void {
    this.onTouched();
    this.checkControlUpdate();
  }

  private refreshLocalValue(value: TValue | null): void {
    this.previousInternalValue = value;
    this.checkControlUpdate();
  }

  private fromControlValue(controlValue: unknown): TValue {
    return controlValue as TValue;
  }

  private toControlValue(componentValue: TValue): unknown {
    return componentValue;
  }

  private safeNgControlData<T>(
    extractor: (ngControl: NgControl) => T | null | undefined,
    defaultFieldValue: T
  ): T {
    return (this.ngControl && extractor(this.ngControl)) ?? defaultFieldValue;
  }
}
