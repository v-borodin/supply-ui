import {
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Input,
} from '@angular/core';
import {
  SupAppearance,
  SupHasAppearance,
  SupHasShape,
  SupHasSize,
  SupShape,
  SupSize,
} from '@supply/cdk';

@Directive({
  selector: 'supCustomizer',
  standalone: true,
})
export class SupCustomizerDirective
  implements SupHasAppearance, SupHasSize, SupHasShape
{
  @Input()
  appearance: SupAppearance;

  @Input()
  @HostBinding('attr.shape')
  set shape(value: SupShape) {
    console.log(value);
    this._shape = value;
  }

  get shape(): SupShape {
    return this._shape;
  }

  @Input()
  size: SupSize;

  private _shape: SupShape;

  constructor(@Inject(ElementRef) private elementRef: ElementRef) {}
}
