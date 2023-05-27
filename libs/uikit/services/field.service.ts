import { Injectable } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';

type FieldControl = NgControl | undefined;

@Injectable()
export class SupFieldService {
  private _control: FieldControl;

  set control(control: FieldControl) {
    this._control = control;
  }

  get control(): FieldControl {
    return this._control;
  }

  get errors(): ValidationErrors | null | undefined {
    return this._control?.control?.errors;
  }
}
