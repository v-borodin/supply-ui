import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import {
  supCoerceBooleanProperty,
  SupFieldSimpleDirective,
  SupImplicitBoolean,
} from '@supply/cdk';

let nextUniqueId = 0;

const idPrefix = 'sup-checkbox-';

@Component({
  selector: 'sup-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent
  extends SupFieldSimpleDirective
  implements ControlValueAccessor
{
  @Input()
  public id?: string;

  @Input()
  public value: any;

  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked(value: SupImplicitBoolean) {
    const checked = supCoerceBooleanProperty(value);

    if (checked != this.checked) {
      this._checked = checked;
      this.cd.markForCheck();
    }
  }

  @Output()
  changed = new EventEmitter();

  private _checked = false;

  private readonly _uniqueId?: string;

  private readonly cd = inject(ChangeDetectorRef);

  get inputId(): string {
    return `${this.id || this._uniqueId}-input`;
  }

  constructor() {
    super(true);
    this.id = this._uniqueId = `${idPrefix}${++nextUniqueId}`;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.checked = !!value;
  }

  public onChangeEvent(event: Event) {
    event.stopPropagation();
  }

  public toggle(): void {
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();

    const { value, checked } = this;
    this.changed.emit({
      value,
      checked,
    });
  }

  private onChange: (value: any) => void = () => {};

  private onTouched: any = () => {};
}
