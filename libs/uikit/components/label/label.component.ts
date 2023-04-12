import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  InjectionToken,
  TemplateRef,
  ViewChild,
} from '@angular/core';

export const SUP_LABEL = new InjectionToken<SupLabelComponent>(
  '@label:SUP_LABEL_LIGHTWEIGHT'
);

@Component({
  selector: 'label[supLabel], sup-label',
  templateUrl: './label.html',
  styleUrls: ['./label.scss'],
  providers: [
    {
      provide: SUP_LABEL,
      useExisting: forwardRef(() => SupLabelComponent),
    },
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupLabelComponent {
  @ViewChild(TemplateRef, { static: true })
  private readonly templateRef?: TemplateRef<any>;

  get content(): TemplateRef<any> | null {
    return this.templateRef || null;
  }
}
