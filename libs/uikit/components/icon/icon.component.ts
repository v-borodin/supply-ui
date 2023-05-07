import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  supCoerceBooleanProperty,
  SupDompurifyPipe,
  SupImplicitBoolean,
  SupSvgRegistry,
} from '@supply/cdk';

@Component({
  selector: 'i[supIcon], sup-icon',
  exportAs: 'supIcon',
  templateUrl: './icon.html',
  styleUrls: ['./icon.scss'],
  inputs: ['src', 'inline'],
  host: {
    role: 'img',
  },
  standalone: true,
  imports: [SupDompurifyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupIconComponent implements OnChanges {
  src = '';

  @HostBinding('class.inline')
  get inline(): boolean {
    return this._inline;
  }

  set inline(inline: SupImplicitBoolean) {
    this._inline = supCoerceBooleanProperty(inline);
  }

  innerHtml: string | null = null;

  private _inline = false;

  constructor(@Inject(SupSvgRegistry) private readonly svgRegistry: SupSvgRegistry) {}

  ngOnChanges({ src }: SimpleChanges) {
    src && this.process(this.src);
  }

  private process(source: string): void {
    const iconFromRegistry = this.getFromRegistry(source);

    if (iconFromRegistry) {
      this.innerHtml = iconFromRegistry;
    }
  }

  private getFromRegistry(key: string): string | null {
    return this.svgRegistry.retrieve(key);
  }
}
