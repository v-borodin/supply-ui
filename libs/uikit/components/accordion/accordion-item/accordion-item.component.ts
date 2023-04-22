import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { supCoerceBooleanProperty, SupImplicitBoolean } from '@supply/cdk';

@Component({
  selector: 'sup-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent {
  @Input()
  collapse = false;

  @Input()
  withArrow = true;

  @ContentChild(`lazyContent`, { read: TemplateRef })
  lazyContent?: TemplateRef<any>;

  @Output()
  readonly collapseChange = new EventEmitter<boolean>();

  @Input()
  @HostBinding(`class._disabled`)
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(disabled: SupImplicitBoolean) {
    this._disabled = supCoerceBooleanProperty(disabled);
  }

  private _disabled = false;

  constructor(
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef
  ) {}

  toggle(): void {
    if (!this.disabled) {
      this.updateCollapse(!this.collapse);
    }
  }

  close(): void {
    this.updateCollapse(false);
    this.changeDetectorRef.markForCheck();
  }

  private updateCollapse(collapse: boolean): void {
    if (this.collapse === collapse) {
      return;
    }

    this.collapse = collapse;
    this.collapseChange.emit(collapse);
  }
}
