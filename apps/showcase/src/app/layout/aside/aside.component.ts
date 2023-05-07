import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { PageSection } from '../section/section.component';
import { DOCUMENT } from '@angular/common';
import { PageComponent } from '../page/page.component';
import { EMPTY_QUERY } from '../sidebar/nav/nav.component';

const FALLBACK_HEADER_HEIGHT = 50;
const HEADER_OFFSET = 28;
const SCROLL_TOP_OFFSET = 60;

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent implements AfterViewInit {
  @ViewChildren('anchorElement')
  private readonly links: QueryList<ElementRef<HTMLAnchorElement>> = EMPTY_QUERY;

  @Input()
  sections: PageSection[] = this.page.sections.toArray();

  currentSection: string | null = null;

  private get window(): Window {
    const { defaultView } = this.document;

    if (!defaultView) {
      throw new Error('Window is not available');
    }

    return defaultView;
  }

  private get headerHeight(): number {
    return this.document.getElementById('header')?.offsetHeight || FALLBACK_HEADER_HEIGHT;
  }

  private get sectionListElement(): HTMLElement {
    return this.page.sectionList?.elementRef.nativeElement;
  }

  constructor(
    @Inject(PageComponent) private readonly page: PageComponent,
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(NgZone) private readonly ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.document.addEventListener(
        'scroll',
        (event: any) => {
          let current = '';

          const { scrollTop } = event.target.documentElement;
          const { offsetTop, children } = this.sectionListElement;

          for (let i = 0; i < children.length; i++) {
            const element = children[i] as HTMLElement;
            if (this.intersected(element, offsetTop, scrollTop)) {
              current = element.id;
            }
          }

          this.ngZone.run(() => {
            if (current !== this.currentSection) {
              this.currentSection = current;
              this.cdr.markForCheck();
            }
          });
        },
        {
          passive: true,
        }
      );
    });
  }

  click(section: PageSection): void {
    const { nativeElement } = section.elementRef;

    const headerOffset = this.headerHeight + HEADER_OFFSET;
    const elementPosition = nativeElement.getBoundingClientRect().top;
    const position = elementPosition + this.window.pageYOffset - headerOffset;

    this.window.scrollTo({
      top: position,
    });
  }

  getMarkerPosition(): number {
    const link = this.links.toArray().find(ref => {
      return ref.nativeElement.id === this.currentSection;
    });

    const top = link?.nativeElement.offsetTop || 0;

    return top + 4;
  }

  private intersected(element: HTMLElement, containerOffset: number, scrollTop: number): boolean {
    return element.offsetTop - containerOffset - this.headerHeight - SCROLL_TOP_OFFSET <= scrollTop;
  }
}
