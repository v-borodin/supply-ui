import { animate, style, transition, trigger } from '@angular/animations';
import { SUP_DEFAULT_DURATION, SUP_DEFAULT_TRANSITION } from './common';

export const SUP_HEIGHT_COLLAPSE_ANIMATION = 'supHeightCollapse';

export const supHeightCollapse = trigger(SUP_HEIGHT_COLLAPSE_ANIMATION, [
  transition(
    `:enter`,
    [style({ height: 0 }), animate(SUP_DEFAULT_TRANSITION, style({ height: `*` }))],
    SUP_DEFAULT_DURATION
  ),
  transition(
    `:leave`,
    [style({ height: `*` }), animate(SUP_DEFAULT_TRANSITION, style({ height: 0 }))],
    SUP_DEFAULT_DURATION
  ),
]);
