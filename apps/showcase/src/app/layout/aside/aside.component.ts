import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { PageSection } from '../section/section.component';
import { DOCUMENT } from '@angular/common';
import { PageComponent } from '../page/page.component';
import { getOriginalArray } from '../../common/constants/query-list';

const FALLBACK_HEADER_HEIGHT = 50;
const HEADER_OFFSET = 28;
const SCROLL_TOP_OFFSET = 60;

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent implements AfterViewInit, OnDestroy {
  @Input()
  sections = getOriginalArray(this.page.sections);

  currentSection: string | null = null;

  private scrollHandler: any;

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

  private get sectionWrapper(): ElementRef | null {
    return this.page.sectionWrapper ?? null;
  }

  constructor(
    @Inject(PageComponent) private readonly page: PageComponent,
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(NgZone) private readonly ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (!this.sectionWrapper) {
      return;
    }

    this.scrollHandler = (event: any) => {
      let current = '';

      const { scrollTop } = event.target.documentElement;
      const { offsetTop, children } = this.sectionWrapper?.nativeElement;

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
    };

    this.ngZone.runOutsideAngular(() => {
      this.document.addEventListener('scroll', this.scrollHandler, {
        passive: true,
      });
    });
  }

  ngOnDestroy(): void {
    this.document.removeEventListener('scroll', this.scrollHandler);
  }

  click(section: PageSection): void {
    const { nativeElement } = section.elementRef;

    const headerOffset = this.headerHeight + HEADER_OFFSET;
    const { top } = nativeElement.getBoundingClientRect();
    const { pageYOffset } = this.window;

    this.window.scrollTo({
      top: top + pageYOffset - headerOffset,
      behavior: 'smooth',
    });
  }

  private intersected(element: HTMLElement, containerOffset: number, scrollTop: number): boolean {
    return (
      element.offsetTop - containerOffset - this.headerHeight - SCROLL_TOP_OFFSET + 200 <= scrollTop
    );
  }
}
