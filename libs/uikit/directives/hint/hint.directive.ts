import { Directive, InjectionToken } from '@angular/core';

export const SUP_HINT = new InjectionToken<HintDirective>(
  '@hint:LIGHTWEIGHT_TOKEN'
);

@Directive({
  selector: 'sup-hint, [supHint]',
  host: {
    class: 'hint',
  },
  providers: [
    {
      provide: SUP_HINT,
      useExisting: HintDirective,
    },
  ],
  standalone: true,
})
export class HintDirective {}
