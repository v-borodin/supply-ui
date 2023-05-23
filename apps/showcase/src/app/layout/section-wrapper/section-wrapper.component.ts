import { ChangeDetectionStrategy, Component, InjectionToken } from '@angular/core';

export const SECTION_WRAPPER = new InjectionToken<SectionWrapperComponent>('[SECTION_WRAPPER]');

@Component({
  selector: 'div[appSectionWrapper]',
  templateUrl: './section-wrapper.component.html',
  styleUrls: ['./section-wrapper.component.scss'],
  providers: [
    {
      provide: SECTION_WRAPPER,
      useExisting: SectionWrapperComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionWrapperComponent {}
