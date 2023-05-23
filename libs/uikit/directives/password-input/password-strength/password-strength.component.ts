import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';

export const SUP_PASSWORD_STRENGTH_DEFAULT_PATTERN = new InjectionToken<
  Readonly<RegExp[]>
>('' + '@passwordStrength:DEFAULT_REGEXP_PATTERN');

@Component({
  selector: 'sup-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordStrengthComponent implements OnChanges {
  @Input()
  value = '';

  @Input()
  pattern: Readonly<RegExp[]> = this.defaultPattern || [];

  @Output()
  stateChange = new EventEmitter<string>();

  get points(): number[] {
    return Array.from(Array(this.pattern.length).keys());
  }

  get state(): string | null {
    return this.states[this.currentForce];
  }

  colorStates: Record<string, string> = {};

  private currentForce = 0;

  private states = [null, 'danger', 'warning', 'success'];

  private compareWith = (o1: any, o2: any) => o1 === o2;

  constructor(
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(SUP_PASSWORD_STRENGTH_DEFAULT_PATTERN)
    private defaultPattern: Readonly<RegExp[]>
  ) {}

  ngOnChanges({ value }: SimpleChanges) {
    value && this.checkValue(this.value || '');
  }

  private checkValue(value: string): void {
    if (value === '') {
      return;
    }

    let matches = 0;

    for (const flag of this.pattern) {
      matches += flag.test(value) ? 1 : 0;
    }

    if (!this.compareWith(matches, this.currentForce)) {
      this.colorStates = {};

      for (let n = 0; n < matches; n++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.colorStates['bar-' + n] = this.states[matches]!;
      }

      this.currentForce = matches;
      this.changeDetectorRef.markForCheck();
    }
  }
}
