import {
  AfterViewInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  inject,
  INJECTOR,
  QueryList,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PAGE_SECTION, PageSection } from '../../layout/section/section.component';
import { AsideComponent } from '../../layout/aside/aside.component';
import { EMPTY_QUERY } from '../constants/query-list';
import { SECTION_WRAPPER } from '../../layout/section-wrapper/section-wrapper.component';

@Directive()
export abstract class AbstractPage implements AfterViewInit {
  @ViewChild('asideContainer', { read: ViewContainerRef })
  private readonly aside!: ViewContainerRef;

  @ContentChild(SECTION_WRAPPER, { read: ElementRef })
  readonly sectionWrapper?: ElementRef;

  @ContentChildren(PAGE_SECTION, { descendants: true })
  readonly sections: QueryList<PageSection> = EMPTY_QUERY;

  private readonly injector = inject(INJECTOR);

  ngAfterViewInit(): void {
    const cmpRef = this.aside.createComponent(AsideComponent, {
      injector: this.injector,
    });

    cmpRef.changeDetectorRef.detectChanges();
  }
}
