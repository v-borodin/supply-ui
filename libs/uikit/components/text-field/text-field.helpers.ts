import { inject, InjectionToken } from '@angular/core';
import { SUP_TEXTAREA_OPTIONS, SupTextareaOptions } from '../textarea';
import { SUP_INPUT_OPTIONS } from '../input';

export type SupTextFieldOptions = SupTextareaOptions;

export const SUP_TEXT_FIELD_OPTIONS = new InjectionToken<SupTextFieldOptions>(
  '@uikit/components:TEXT_FIELD_OPTIONS_TOKEN',
  {
    factory: () => {
      const inputDefault = inject(SUP_INPUT_OPTIONS);
      const textAreaDefault = inject(SUP_TEXTAREA_OPTIONS);

      return {
        ...inputDefault,
        ...textAreaDefault,
      };
    },
  },
);
