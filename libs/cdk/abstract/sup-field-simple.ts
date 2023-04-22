import {
  AfterContentInit,
  Directive,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { supIsValueAccessor } from '@supply/cdk';
import { SUP_FORM_FIELD_CONTROLLER } from '@supply/cdk/tokens';

@Directive()
export abstract class SupFieldSimpleDirective
  implements OnInit, AfterContentInit
{
  protected readonly parentField = inject(SUP_FORM_FIELD_CONTROLLER, {
    host: true,
    optional: true,
  });

  protected readonly ngControl = inject(NgControl, { optional: true });

  protected constructor(asValueAccessor = false) {
    if (this.ngControl && asValueAccessor && supIsValueAccessor(this)) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.setFormControl();
  }

  ngAfterContentInit() {
    this.ngControl?.touched && this.parentField?.markAsTouched();
  }

  @HostListener('blur', ['$event'])
  protected onBlur(): void {
    this.parentField?.markAsTouched();
  }

  private setFormControl(): void {
    if (this.parentField && this.ngControl) {
      this.parentField.setFormControl(this.ngControl);
    }
  }
}
