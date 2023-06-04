import { animate, style, transition, trigger } from '@angular/animations';
import { SUP_DEFAULT_DURATION, SUP_DEFAULT_TRANSITION } from './common';

export const SUP_SLIDE_IN_RIGHT_ANIMATION = 'supSlideInRight';

export const supSlideInRight = trigger(SUP_SLIDE_IN_RIGHT_ANIMATION, [
  transition(
    `:enter`,
    [
      style({ transform: `translateX(100%)` }),
      animate(SUP_DEFAULT_TRANSITION, style({ transform: `translateX(0)` })),
    ],
    SUP_DEFAULT_DURATION
  ),
  transition(
    `:leave`,
    [
      style({ transform: `translateX(0)` }),
      animate(SUP_DEFAULT_TRANSITION, style({ transform: `translateX(100%)` })),
    ],
    SUP_DEFAULT_DURATION
  ),
]);
