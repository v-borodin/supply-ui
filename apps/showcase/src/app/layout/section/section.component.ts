import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  ViewChild,
} from '@angular/core';
import { SupIdGeneratorStrategy } from '@supply/cdk';
import { ReflectiveContent } from '@coreteq/ngx-projection';

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

  @Input()
  icon: ReflectiveContent;

  get title(): string {
    return this.heading?.textContent || '';
  }

  id = this.idGenerator.generate();

  private get heading(): HTMLElement | null {
    return this.headingElement?.nativeElement;
  }

  constructor(
    @Inject(ElementRef) readonly elementRef: ElementRef,
    @Inject(SupIdGeneratorStrategy)
    private readonly idGenerator: SupIdGeneratorStrategy<string>
  ) {}
}
