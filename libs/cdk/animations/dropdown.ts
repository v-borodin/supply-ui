import { animate, style, transition, trigger } from '@angular/animations';
import { SUP_DEFAULT_DURATION, SUP_DEFAULT_TRANSITION } from './common';

export const SUP_DROPDOWN_ANIMATION = 'supDropdownAnimation';

export const enum SupDropdownAnimation {
  FadeInBottom = 'fadeInBottom',
  FadeInTop = 'fadeInTop',
}

export const supDropdownAnimation = trigger(SUP_DROPDOWN_ANIMATION, [
  transition(
    `* => ${SupDropdownAnimation.FadeInTop}`,
    [
      style({
        transform: `translateY(-10px)`,
        opacity: 0,
      }),
      animate(SUP_DEFAULT_TRANSITION, style({ transform: 'translateY(0)', opacity: 1 })),
    ],
    SUP_DEFAULT_DURATION,
  ),
  transition(
    `* => ${SupDropdownAnimation.FadeInBottom}`,
    [
      style({
        transform: 'translateY(10px)',
        opacity: 0,
      }),
      animate(SUP_DEFAULT_TRANSITION, style({ transform: 'translateY(0)', opacity: 1 })),
    ],
    SUP_DEFAULT_DURATION,
  ),
  transition(
    `${SupDropdownAnimation.FadeInBottom} => *`,
    [
      style({ transform: 'translateY(0)', opacity: 1 }),
      animate(SUP_DEFAULT_TRANSITION, style({ transform: 'translateY(10px)', opacity: 0 })),
    ],
    SUP_DEFAULT_DURATION,
  ),
  transition(
    `${SupDropdownAnimation.FadeInTop} => *`,
    [
      style({ transform: 'translateY(0)', opacity: 1 }),
      animate(SUP_DEFAULT_TRANSITION, style({ transform: 'translateY(-10px)', opacity: 0 })),
    ],
    SUP_DEFAULT_DURATION,
  ),
]);
