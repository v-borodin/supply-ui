import { Directive } from '@angular/core';

@Directive({
  selector: 'sup-error, [supError]',
  host: {
    class: 'invalid-feedback',
  },
  standalone: true,
})
export class ErrorDirective {}
