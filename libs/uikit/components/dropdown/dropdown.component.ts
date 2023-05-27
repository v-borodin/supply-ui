import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  InjectionToken,
  Injector,
  INJECTOR,
  Input,
  Type,
} from '@angular/core';
import { AnimationOptions } from '@angular/animations';
import {
  SUP_ANIMATION_OPTIONS,
  SUP_DROPDOWN_ANIMATION,
  SupDropdownAnimation,
  supDropdownAnimation,
  supMixinClose,
  supMixinShape,
  supMixinSize,
} from '@supply/cdk';
import { SupDropdownDirective } from './dropdown.directive';
import { SUP_CLOSE_WORD } from '@supply/uikit';

export const SUP_DROPDOWN_HOST = new InjectionToken<Type<unknown>>(
  '@uikit/components:DROPDOWN_HOST_PROVIDER',
  {
    factory: () => SupDropdownComponent,
  }
);

const DropdownMixin = supMixinClose(
  supMixinShape(
    supMixinSize(
      class {
        constructor(readonly elementRef: ElementRef) {}
      }
    )
  )
);

@Component({
  selector: 'sup-dropdown',
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.scss'],
  // eslint-disable-next-line @angular-eslint/no-output-native
  outputs: ['close'],
  animations: [supDropdownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupDropdownComponent<TContext> extends DropdownMixin {
  @HostBinding(`@${SUP_DROPDOWN_ANIMATION}`)
  readonly dropdownAnimation = {
    value: SupDropdownAnimation.FadeInTop,
    ...this.animationOptions,
  } as const;

  @Input()
  override size = this.controller.size;

  @Input()
  override shape = this.controller.shape;

  @Input()
  width = this.controller.width;

  constructor(
    @Inject(SUP_ANIMATION_OPTIONS) private readonly animationOptions: AnimationOptions,
    @Inject(forwardRef(() => SupDropdownDirective))
    readonly controller: SupDropdownDirective<TContext>,
    @Inject(SUP_CLOSE_WORD) readonly closeWord: string,
    @Inject(INJECTOR) readonly injector: Injector,
    @Inject(ElementRef) elementRef: ElementRef
  ) {
    super(elementRef);
  }

  onClose(): void {
    this.close.emit();
    this.controller.toggle(false);
  }
}
