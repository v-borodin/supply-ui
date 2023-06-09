import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Host,
  Inject,
  InjectionToken,
  Optional,
  ViewChild,
} from '@angular/core';
import { SupIdGeneratorStrategy } from '@supply/cdk';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { SectionWrapperComponent } from '../section-wrapper/section-wrapper.component';
import { supMemo } from '@supply/cdk/decorators';

export interface PageSection {
  readonly id: string;

  readonly title: string;

  readonly elementRef: ElementRef;
}

export const PAGE_SECTION = new InjectionToken<SectionComponent>('[PAGE_SECTION]');

@Component({
  selector: 'section[appSection]',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  host: {
    '[attr.id]': 'id',
  },
  inputs: ['icon'],
  providers: [
    {
      provide: PAGE_SECTION,
      useExisting: SectionComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent implements PageSection {
  @ViewChild('headingRef', { static: false, read: ElementRef })
  private headingElement?: ElementRef;

  @supMemo
  get title(): string {
    return this.heading?.textContent || '';
  }

  icon: ReflectiveContent;

  id = this.idGenerator.generate();

  private get heading(): HTMLElement | null {
    return this.headingElement?.nativeElement;
  }

  constructor(
    @Inject(ElementRef) readonly elementRef: ElementRef,
    @Inject(SupIdGeneratorStrategy)
    private readonly idGenerator: SupIdGeneratorStrategy<string>,
    @Inject(SectionWrapperComponent) @Optional() @Host() host: SectionWrapperComponent
  ) {
    if (!host) {
      console.warn(
        `It is necessary to use ${[
          SectionWrapperComponent.name,
        ]} as a host element for the scroll handler to work correctly`
      );
    }
  }
}
