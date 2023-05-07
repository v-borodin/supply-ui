import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { HighlightService } from '../../services/highlight.service';

@Component({
  selector: 'pre[highlight]',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss'],
  host: {
    class: 'line-numbers rounded',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightComponent implements AfterViewChecked {
  @Input('highlight')
  code: any;

  @Input()
  lang = 'ts';

  copied = false;

  private highlighted = false;

  constructor(
    @Inject(HighlightService) private highlightService: HighlightService,
    @Inject(ChangeDetectorRef) private cdr: ChangeDetectorRef
  ) {}

  copyToClipboard(code: string): void {
    window.navigator.clipboard.writeText(code).then(() => {
      this.copied = true;
      this.cdr.markForCheck();
    });
  }

  ngAfterViewChecked(): void {
    if (!this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
