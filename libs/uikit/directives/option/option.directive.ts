import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';

export type OptionValueType = string | number;

@Directive({
  selector: 'sup-option',
  standalone: true,
})
export class SupOptionDirective implements AfterContentInit {
  @Input()
  value?: OptionValueType;

  @Input()
  disabled?: boolean;

  @Input()
  hidden?: boolean;

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-native
  change = new EventEmitter<OptionValueType>();

  public text = '';

  private _selected = false;

  public get selected(): boolean {
    return this._selected;
  }

  constructor(@Inject(ElementRef) private element: ElementRef<HTMLElement>) {}

  ngAfterContentInit() {
    this.text = (this.getHostElement().textContent || '').trim();
  }

  public select(): void {
    if (!this._selected) {
      this._selected = true;
      this.change.emit(this.value);
    }
  }

  public deselect(): void {
    if (this._selected) {
      this._selected = false;
      this.change.emit(this.value);
    }
  }

  private getHostElement(): HTMLElement {
    return this.element.nativeElement;
  }
}
