import { Directive, HostBinding, Input } from '@angular/core';
import { SupFieldSimpleDirective } from '@supply/cdk';

@Directive({
  selector: '[supTextInput]',
  standalone: true,
})
export class TextInputDirective extends SupFieldSimpleDirective {
  @Input()
  size = `medium`;

  @HostBinding(`class`)
  get classes() {
    return `input-box ${this.size}`;
  }

  constructor() {
    super();
  }
}
