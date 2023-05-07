import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
} from '@angular/core';
import { SupIdGeneratorStrategy } from '@supply/cdk';

export interface PageSection {
  readonly id: string;

  readonly title: string;

  readonly elementRef: ElementRef;
}

export const PAGE_SECTION = new InjectionToken<SectionComponent>(
  '[PAGE_SECTION]'
);

@Component({
  selector: 'section[appPageSection]',
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
  @Input('name')
  title = '';

  id = this.idGenerator.generate();

  constructor(
    @Inject(ElementRef) readonly elementRef: ElementRef,
    @Inject(SupIdGeneratorStrategy)
    private readonly idGenerator: SupIdGeneratorStrategy<string>
  ) {}
}
