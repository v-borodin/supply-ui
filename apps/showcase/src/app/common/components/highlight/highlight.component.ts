import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { HighlightService } from '../../services/highlight.service';

@Component({
  selector: 'pre[highlight]',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss'],
  inputs: ['code:highlight', 'lang'],
  host: {
    class: 'line-numbers',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightComponent implements AfterViewChecked {
  code = '';

  lang = 'ts';

  copied = false;

  private highlighted = false;

  constructor(
    @Inject(HighlightService) private readonly highlightService: HighlightService,
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef
  ) {}

  copyToClipboard(code: string): void {
    window.navigator.clipboard
      .writeText(code)
      .then(() => (this.copied = true))
      .catch(err => console.error(err))
      .finally(() => this.cdr.markForCheck());
  }

  ngAfterViewChecked(): void {
    if (!this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
