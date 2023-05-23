import {
  Component,
  ContentChild,
  InjectionToken,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { supCoerceBooleanProperty, SupImplicitBoolean } from '@supply/cdk';

export const SUP_RADIO = new InjectionToken<RadioButtonComponent>(
  'SupRadioButton'
);

@Component({
  selector: 'sup-radio-button',
  templateUrl: 'radio-button.component.html',
  styleUrls: ['radio-button.component.scss'],
  providers: [
    {
      provide: SUP_RADIO,
      useExisting: RadioButtonComponent,
    },
  ],
  standalone: true,
})
export class RadioButtonComponent {
  @ViewChild(TemplateRef, { static: true })
  public content!: TemplateRef<any>;

  @ContentChild('lazyContent')
  public lazyContent?: TemplateRef<any>;

  @Input()
  value: any;

  @Input()
  set checked(checked: SupImplicitBoolean) {
    this._checked = supCoerceBooleanProperty(checked);
  }

  get checked(): boolean {
    return this._checked;
  }

  private _checked = false;
}
