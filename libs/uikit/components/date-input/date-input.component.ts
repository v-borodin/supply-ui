import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Inject,
  Optional,
  Self,
} from '@angular/core';
import { SupAbstractNullableControl } from '@supply/cdk';
import { NgControl } from '@angular/forms';
import { SUP_LABEL, SupLabelDirective } from '../../directives';
import { DateTime } from 'luxon';
import { ReflectiveContent } from '@coreteq/ngx-projection';

@Component({
  selector: 'sup-date-input',
  templateUrl: './date-input.html',
  styleUrls: ['./date-input.scss'],
  inputs: ['iconRight'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupDateInputComponent extends SupAbstractNullableControl<string> {
  @ContentChild(SUP_LABEL, { descendants: true })
  readonly label?: SupLabelDirective;

  iconRight: ReflectiveContent;

  hasClear = true;

  appearance = 'primary';

  size = 'md';

  shape = 'rounded';

  open = false;

  get computedValue(): string {
    return this.value || '';
  }

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    control: NgControl | null,
    @Inject(ElementRef) elementRef: ElementRef
  ) {
    super(control, elementRef);
  }

  onValueChange(value: DateTime | null, close = false): void {
    if (!value) {
      this.value = null;
    } else {
      this.value = value.toISODate() || null;
    }

    if (close) {
      this.open = false;
    }
  }
}
