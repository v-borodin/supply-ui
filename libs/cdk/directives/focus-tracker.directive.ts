import {
  Directive,
  HostListener,
  Inject,
  InjectionToken,
  Self,
  Type,
} from '@angular/core';
import { SupCanFocus } from '@supply/cdk/interfaces';

export const SUP_FOCUSABLE_ELEMENT = new InjectionToken<Type<SupCanFocus>>(
  '@element:FOCUSABLE_ELEMENT'
);

@Directive({
  selector: '[supFocusTracker]',
  standalone: true,
})
export class SupFocusTrackerDirective {
  constructor(
    @Self() @Inject(SUP_FOCUSABLE_ELEMENT) private readonly element: SupCanFocus
  ) {}

  @HostListener('focusin', ['true'])
  @HostListener('focusout', ['false'])
  onFocus(focus: boolean): void {
    this.element.focused = focus;
  }
}
