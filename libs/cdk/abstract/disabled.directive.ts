import { Directive, HostBinding, Input } from '@angular/core';
import { SupCanDisable } from '@supply/cdk/interfaces';

@Directive()
export abstract class DisabledDirective implements SupCanDisable {
  private _disabled = false;

  @Input()
  @HostBinding('class._disabled')
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }
}
