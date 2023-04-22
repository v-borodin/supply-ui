import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Inject,
  inject,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SupOptionDirective } from '../../directives/option/option.directive';
import {
  runOutsideAngular,
  SupClickOutsideHandler,
  supCoerceBooleanProperty,
  SupDestroyService,
  SupFieldSimpleDirective,
  SupImplicitBoolean,
} from '@supply/cdk';
import { Observable, skipWhile, startWith, takeUntil, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { SupIconComponent } from '@supply/uikit/components';

@Component({
  selector: 'sup-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    role: 'combobox',
    'aria-autocomplete': 'none',
    'aria-haspopup': 'listbox',
    '[attr.aria-expanded]': 'dropped',
    '[attr.aria-disabled]': 'disabled.toString()',
  },
  providers: [SupClickOutsideHandler],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, NgIf, SupIconComponent],
})
export class SelectComponent
  extends SupFieldSimpleDirective
  implements OnInit, AfterContentInit, ControlValueAccessor
{
  @ContentChildren(SupOptionDirective, { descendants: true })
  options?: QueryList<SupOptionDirective>;

  @Input()
  size = `medium`;

  @Input()
  set multiple(value: SupImplicitBoolean) {
    this._multiple = supCoerceBooleanProperty(value);
  }

  get multiple() {
    return this._multiple;
  }

  @Input()
  set nullable(value: SupImplicitBoolean) {
    this._nullable = supCoerceBooleanProperty(value);
  }

  get nullable() {
    return this._nullable;
  }

  @Input()
  disabled = false;

  @Input()
  placeholder?: string;

  dropped = false;

  focused = false;

  selection = new Set<SupOptionDirective>();

  clickOutside$: Observable<Event>;

  @Input()
  set value(newValue: any) {
    console.log(newValue);
    const hasAssigned = this.assignValue(newValue);
    if (hasAssigned) {
      this.onChange(newValue);
    }
  }

  get value(): any {
    return this.innerValue;
  }

  private _multiple = false;

  private _nullable = false;

  private innerValue: any;

  private readonly cd = inject(ChangeDetectorRef);

  private compareWith = (o1: any, o2: any) => o1 === o2;

  public get selected(): SupOptionDirective | SupOptionDirective[] {
    const values = Array.from(this.selection.values());
    return this.multiple ? values || [] : values[0];
  }

  constructor(
    @Inject(SupClickOutsideHandler) outsideHandler$: Observable<Event>,
    @Inject(SupDestroyService) private destroy$: SupDestroyService
  ) {
    super(true);

    this.clickOutside$ = runOutsideAngular(outsideHandler$).pipe(
      skipWhile(() => !this.dropped),
      tap(() => {
        if (this.dropped) {
          this.toggleDropdown(false);
        }
      })
    );
  }

  override ngOnInit() {
    super.ngOnInit();
    this.value && this.onChange(this.value);
  }

  override ngAfterContentInit() {
    super.ngAfterContentInit();
    if (this.options && this.innerValue) {
      this.setSelectionByValue(this.innerValue);
    }
  }

  private onChange = (val: any | null) => {};

  private onTouched = () => {};

  writeValue(value: any): void {
    if (!this.nullable && value == null) {
      return;
    }

    if (value == null || (Array.isArray(value) && !value.length)) {
      this.unmarkAll();
      this.selection.clear();
    }
    this.assignValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public toggleDropdown(visible: boolean): void {
    if (this.disabled) {
      return;
    }

    if (!visible && !this.focused) {
      this.controlMarkAsTouched();
      this.focused = true;
    }

    this.dropped = visible;
    this.cd.markForCheck();
  }

  public select(option: SupOptionDirective): void {
    if (option.disabled) {
      return;
    }
    this.resolveOptionSelection(option);
    this.propagateChanges(option.value);
    this.dropped = false;
  }

  public deselect(option: SupOptionDirective): void {
    this.unmarkSelected(option);
    this.propagateChanges(option.value);
  }

  public trackByFn(index: number): number {
    return index;
  }

  private resolveOptionStatement(option: SupOptionDirective): void {
    if (!this.multiple) {
      if (this.isSelected(option)) {
        if (this._nullable) {
          this.unmarkAll();
        }
        return;
      }
      this.unmarkAll();
      this.markSelected(option);
    } else {
      if (this.isSelected(option)) {
        this.unmarkSelected(option);
        return;
      }
      this.markSelected(option);
    }
  }

  private setSelectionByValue(value: any | any[]): void {
    if (this.multiple && value) {
      if (!Array.isArray(value)) {
        throw new Error(`Value ${value} is not array in multiple selection`);
      }
      value.forEach((currentValue: any) =>
        this.selectOptionByValue(currentValue)
      );
    } else {
      this.selectOptionByValue(value);
    }
    this.cd.markForCheck();
  }

  private selectOptionByValue(value: any): void {
    this.options?.changes
      .pipe(startWith(null), takeUntil(this.destroy$))
      .subscribe(() => {
        const correspondingOption = this.options?.find(
          (option: SupOptionDirective) => {
            if (this.isSelected(option)) {
              return false;
            }
            try {
              return (
                option.value != null && this.compareWith(option.value, value)
              );
            } catch (error) {
              return false;
            }
          }
        );
        if (correspondingOption) {
          this.resolveOptionSelection(correspondingOption);
        }
      });
  }

  private isSelected(value: SupOptionDirective): boolean {
    return this.selection.has(value);
  }

  private markSelected(option: SupOptionDirective): void {
    if (!this.isSelected(option)) {
      option.select();
      this.selection.add(option);
      this.cd.markForCheck();
    }
  }

  private unmarkSelected(option: SupOptionDirective): void {
    if (this.isSelected(option)) {
      this.selection.delete(option);
      option.deselect();
    }
  }

  private unmarkAll() {
    if (!this.isEmpty()) {
      this.selection.forEach(value => this.unmarkSelected(value));
    }
  }

  private propagateChanges(fallbackValue: any): void {
    let valueToEmit: any;
    if (this.multiple) {
      valueToEmit = (this.selected as SupOptionDirective[]).map(
        option => option.value
      );
    } else {
      valueToEmit = this.selection
        ? (this.selected as SupOptionDirective)?.value
        : fallbackValue;
    }
    this.innerValue = valueToEmit;
    this.onChange(valueToEmit);
    this.cd.markForCheck();
  }

  private resolveOptionSelection(...values: SupOptionDirective[]): void {
    values.forEach(value => this.resolveOptionStatement(value));
  }

  private isEmpty(): boolean {
    return this.selection.size === 0;
  }

  private assignValue(newValue: any | any[]): boolean {
    if (
      newValue !== this.innerValue ||
      (this.multiple && Array.isArray(newValue))
    ) {
      if (this.options) {
        this.setSelectionByValue(newValue);
      }
      this.innerValue = newValue;
      return true;
    }
    return false;
  }

  private controlMarkAsTouched(): void {
    this.onTouched();
  }
}
