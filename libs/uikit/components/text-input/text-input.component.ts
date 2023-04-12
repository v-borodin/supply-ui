import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Inject,
  Input,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { SUP_LABEL, SupLabelComponent } from '@supply/uikit/components';
import {
  SupAbstractElementBinder,
  SupFocusTracker,
  supMixinInteractive,
  supMixinShape,
  supMixinSize,
} from '@supply/cdk';
import { NgControl } from '@angular/forms';

const SupTextInputMixin = supMixinInteractive(
  supMixinSize(supMixinShape(SupAbstractElementBinder))
);

@Component({
  selector: 'sup-text-input',
  templateUrl: './text-input.html',
  styleUrls: ['./text-input.scss'],
  inputs: ['id', 'disabled'],
  standalone: true,
  imports: [NgIf, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupTextInputComponent
  extends SupTextInputMixin
  implements AfterContentInit
{
  @ViewChild('textInput')
  private readonly textInput?: ElementRef<HTMLInputElement>;

  @ContentChild(SUP_LABEL, { descendants: true })
  label?: SupLabelComponent;

  @Input()
  hasClearIcon = true;

  constructor(
    @Inject(ElementRef) override readonly elementRef: ElementRef<HTMLElement>,
    @Optional()
    @Self()
    @Inject(NgControl)
    private control: NgControl | null,
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef,
    @Inject(SupFocusTracker)
    private focusTracker: SupFocusTracker
  ) {
    super();
  }

  ngAfterContentInit() {
    this.updateFocus();
  }

  @HostListener('focusin', ['true'])
  @HostListener('focusout', ['false'])
  onFocused(focused: boolean): void {
    this.focused = focused;
    focused && this.textInput?.nativeElement.focus();
  }

  clear(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  updateFocus(): void {}
}
