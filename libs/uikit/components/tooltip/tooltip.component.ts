import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
} from '@angular/core';
import { AnimationOptions } from '@angular/animations';
import {
  SUP_ANIMATION_OPTIONS,
  SUP_FADEIN_ANIMATION,
  supFadeIn,
  supMixinAppearance,
  supMixinShape,
} from '@supply/cdk';
import { SupTooltipDirective } from './tooltip.directive';

const TooltipMixin = supMixinAppearance(
  supMixinShape(
    class {
      constructor(readonly elementRef: ElementRef) {}
    }
  )
);

@Component({
  selector: 'sup-tooltip',
  templateUrl: './tooltip.html',
  styleUrls: ['./tooltip.scss'],
  animations: [supFadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupTooltipComponent<TContext> extends TooltipMixin {
  @HostBinding(`@${SUP_FADEIN_ANIMATION}`)
  readonly animation = { value: '', ...this.animationOptions } as const;

  override appearance = this.controller.appearance;

  override shape = this.controller.shape;

  @HostBinding('attr.data-sup-tooltip-position')
  private get position(): string {
    return this.controller.position;
  }

  constructor(
    @Inject(SUP_ANIMATION_OPTIONS) private readonly animationOptions: AnimationOptions,
    @Inject(forwardRef(() => SupTooltipDirective))
    readonly controller: SupTooltipDirective<TContext>,
    @Inject(ElementRef) elementRef: ElementRef
  ) {
    super(elementRef);
  }

  @HostListener('mouseleave', ['$event.relatedTarget'])
  private handleMouseLeave(relatedTarget: Node): void {
    if (!relatedTarget || !this.controller.triggerElement.contains(relatedTarget)) {
      this.isVisible() && this.hide();
    }
  }

  private isVisible(): boolean {
    return this.controller.show;
  }

  private hide(): void {
    this.controller.toggle(false);
  }
}
