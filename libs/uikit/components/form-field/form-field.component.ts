import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Inject,
  Input,
  NgZone,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import {
  Observable,
  Subject,
  distinctUntilChanged,
  startWith,
  EMPTY,
} from 'rxjs';
import { SupDestroyService, SupFormFieldController } from '@supply/cdk';
import { SupFieldService } from '@supply/uikit/services';
import { HintDirective, SUP_HINT } from '@supply/uikit/directives/hint';
import { SUP_FORM_FIELD_CONTROLLER } from '@supply/cdk/tokens';
import { NgIf } from '@angular/common';
import { SupLoaderComponent } from '@supply/uikit/components/loader';

@Component({
  selector: 'sup-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [
    SupFieldService,
    SupDestroyService,
    {
      provide: SUP_FORM_FIELD_CONTROLLER,
      useExisting: FormFieldComponent,
    },
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SupLoaderComponent, NgIf],
})
export class FormFieldComponent implements SupFormFieldController {
  @ContentChild(SUP_HINT, { descendants: true })
  hint?: HintDirective;

  @Input()
  showLoader = false;

  @Input()
  showErrors = true;

  @Input()
  error: string | null = null;

  get onTouched(): Observable<boolean> {
    return this.controlTouched$.asObservable().pipe(distinctUntilChanged());
  }

  get onStatusChanged(): Observable<any> {
    return (this.fieldService.control?.statusChanges ?? EMPTY).pipe(
      startWith(null)
    );
  }

  private readonly controlTouched$ = new Subject<boolean>();

  constructor(
    @Inject(SupFieldService) private fieldService: SupFieldService,
    @Inject(SupDestroyService) private destroy$: SupDestroyService,
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef,
    @Inject(NgZone) private ngZone: NgZone
  ) {}

  setFormControl(control: NgControl): void {
    this.fieldService.control = control;
  }

  markAsTouched(): void {
    this.controlTouched$.next(true);
  }
}
