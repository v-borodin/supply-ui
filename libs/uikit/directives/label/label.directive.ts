import { Directive, InjectionToken, Type } from '@angular/core';

export const SUP_LABEL = new InjectionToken<Type<SupLabelDirective>>(
  '@uikit/directive:SUP_LABEL_TOKEN',
);

@Directive({
  selector: '[supLabel], sup-label',
  standalone: true,
  providers: [
    {
      provide: SUP_LABEL,
      useExisting: SupLabelDirective,
    },
  ],
})
export class SupLabelDirective {}
