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
import {
  PAGE_SECTION,
  PageSection,
} from '../../layout/section/section.component';
import { EMPTY_QUERY } from '../../layout/sidebar/nav/nav.component';
import { AsideComponent } from '../../layout/aside/aside.component';
import { SectionListComponent } from '../../layout/page/section-list/section-list.component';

@Directive()
export abstract class AbstractPage implements AfterViewInit {
  @ViewChild('asideContainer', { read: ViewContainerRef })
  private readonly aside!: ViewContainerRef;

  @ContentChild(SectionListComponent, { static: true })
  readonly sectionList?: SectionListComponent;

  @ContentChildren(PAGE_SECTION, { descendants: true })
  readonly sections: QueryList<PageSection> = EMPTY_QUERY;

  private readonly injector = inject(INJECTOR);

  ngAfterViewInit() {
    const cmpRef = this.aside.createComponent(AsideComponent, {
      injector: this.injector,
    });

    cmpRef.changeDetectorRef.detectChanges();
  }
}
