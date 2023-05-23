import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { take, tap } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input[type=range][supSlider]',
  templateUrl: './slider.component.html',
  host: {
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    '(input)': '0',
  },
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  @Input()
  segments = 1;

  get min(): number {
    return Number(this.elementRef.nativeElement.min);
  }

  get max(): number {
    return Number(this.elementRef.nativeElement.max || 100);
  }

  get step(): number {
    return Number(this.elementRef.nativeElement.step) || 1;
  }

  get value(): number {
    const { elementRef, control } = this;

    if (control instanceof NgModel) {
      return control.viewModel;
    }

    return Number(elementRef.nativeElement.value) || 0;
  }

  set value(newValue: number) {
    this.elementRef.nativeElement.value = `${newValue}`;
  }

  @HostBinding('style.--sup-slider-fill-percentage.%')
  get valuePercentage(): number {
    return (100 * (this.value - this.min)) / (this.max - this.min) || 0;
  }

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    private readonly control: NgControl | null,
    @Inject(ElementRef) readonly elementRef: ElementRef<HTMLInputElement>,
    @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef
  ) {
    if (control instanceof NgModel) {
      control.valueChanges
        ?.pipe(
          tap(() => {
            changeDetectorRef.markForCheck();
          }),
          take(1)
        )
        .subscribe();
    }
  }
}
