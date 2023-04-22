import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  Renderer2,
} from '@angular/core';
import {
  supCoerceBooleanProperty,
  SupImplicitBoolean,
  SupSvgRegistry,
} from '@supply/cdk';

@Component({
  selector: 'i[supIcon], sup-icon',
  exportAs: 'supIcon',
  templateUrl: './icon.html',
  styleUrls: ['./icon.scss'],
  host: {
    role: 'img',
  },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupIconComponent {
  @Input()
  set src(value: string) {
    this.process(value);
    this._src = value;
  }

  get src(): string {
    return this._src;
  }

  @Input()
  @HostBinding('class.inline')
  get inline(): boolean {
    return this._inline;
  }

  set inline(inline: SupImplicitBoolean) {
    this._inline = supCoerceBooleanProperty(inline);
  }

  private _inline = false;

  private _src = '';

  constructor(
    @Inject(SupSvgRegistry) private readonly svgRegistry: SupSvgRegistry,
    @Inject(ElementRef) private readonly elementRef: ElementRef,
    @Inject(Renderer2) private readonly renderer: Renderer2
  ) {}

  private process(source: string): void {
    const iconFromRegistry = this.getFromRegistry(source);

    if (iconFromRegistry) {
      this.appendSvgElement(iconFromRegistry);
    }
  }

  private getFromRegistry(key: string): SVGElement | null {
    return this.svgRegistry.retrieve(key);
  }

  private appendSvgElement(svg: SVGElement): void {
    const { nativeElement } = this.elementRef;

    this.renderer.appendChild(nativeElement, svg);
  }
}
