import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  inject,
  Inject,
  Optional,
  Self,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import {
  SUP_DATA_LIST_CONTROLLER,
  SupAbstractNullableControl,
  SupDataListController,
} from '@supply/cdk';
import { SupSelectOptions, SUP_SELECT_OPTIONS } from './select.helpers';
import { SupDropdownDirective } from '../dropdown';
import { SupDataListDirective } from '../data-list';
import { SUP_LABEL, SupLabelDirective } from '../../directives';
import { SUP_INPUT_OPTIONS } from '../input';

@Component({
  selector: 'sup-select',
  templateUrl: './select.html',
  styleUrls: ['./select.scss'],
  inputs: ['appearance', 'size', 'shape', 'hasClear', 'stringify'],
  providers: [
    {
      provide: SUP_DATA_LIST_CONTROLLER,
      useExisting: SupSelectComponent,
    },
    {
      provide: SUP_INPUT_OPTIONS,
      useFactory: () => {
        return inject(SUP_SELECT_OPTIONS);
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupSelectComponent<TValue>
  extends SupAbstractNullableControl<TValue>
  implements SupDataListController<any>
{
  hasClear = this.options.hasClear;

  appearance = this.options.appearance;

  size = this.options.size;

  shape = this.options.shape;

  @ViewChild(SupDropdownDirective, { static: true })
  readonly dropdown?: SupDropdownDirective<any>;

  @ContentChild(SUP_LABEL, { descendants: true })
  readonly label?: SupLabelDirective;

  @ContentChild(SupDataListDirective, { read: TemplateRef })
  readonly dataList?: TemplateRef<any>;

  stringify = this.options.stringify;

  get computedValue(): string {
    return this.value === null ? '' : this.stringify(this.value) || ' ';
  }

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    control: NgControl | null,
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(SUP_SELECT_OPTIONS) private readonly options: SupSelectOptions,
  ) {
    super(control, elementRef);
  }

  checkOption(option: any): void {}

  handleOption(value: TValue): void {
    this.value = value;
    this.dropdown?.toggle(false);
  }

  onValueChange(value: TValue): void {
    if (!value) {
      this.value = null;
    } else {
      this.value = value || null;
    }
  }
}
