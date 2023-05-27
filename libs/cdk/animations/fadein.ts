import { animate, style, transition, trigger } from '@angular/animations';
import { SUP_DEFAULT_DURATION, SUP_DEFAULT_TRANSITION } from './common';

export const SUP_FADEIN_ANIMATION = 'supFadein';

export const supFadeIn = trigger(SUP_FADEIN_ANIMATION, [
  transition(
    ':enter',
    [style({ opacity: 0 }), animate(SUP_DEFAULT_TRANSITION, style({ opacity: 1 }))],
    SUP_DEFAULT_DURATION,
  ),
  transition(
    ':leave',
    [style({ opacity: 1 }), animate(SUP_DEFAULT_TRANSITION, style({ opacity: 0 }))],
    SUP_DEFAULT_DURATION,
  ),
]);
