import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { DateTime } from 'luxon';
import { NgForOf, NgIf } from '@angular/common';
import { YearPipe } from './year.pipe';
import { SUP_SCROLL_INTO_VIEW, SupScrollIntoViewDirective } from '@supply/cdk';

const MIN_YEAR = DateTime.fromObject({ year: 1900 });
const MAX_YEAR = DateTime.local();

export const YEARS_PER_ROW = 4;

export function supIsHTMLElement(node: unknown): node is HTMLElement {
  return node instanceof HTMLElement;
}

export function supGetElementOffset(
  host: Element,
  element: HTMLElement
): { offsetTop: number; offsetLeft: number } {
  let { offsetTop, offsetLeft, offsetParent } = element;

  while (supIsHTMLElement(offsetParent) && offsetParent !== host) {
    offsetTop += offsetParent.offsetTop;
    offsetLeft += offsetParent.offsetLeft;
    offsetParent = offsetParent.offsetParent;
  }

  return { offsetTop, offsetLeft };
}

@Component({
  selector: 'sup-years-list',
  standalone: true,
  templateUrl: './years-list.component.html',
  styleUrls: ['./years-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, YearPipe, NgIf, SupScrollIntoViewDirective],
})
export class YearsListComponent {
  @Input()
  value: DateTime | null = null;

  @Input()
  min: DateTime = MIN_YEAR;

  @Input()
  max: DateTime = MAX_YEAR;

  @Input()
  initYear = DateTime.local().year;

  @Output()
  readonly yearSelect = new EventEmitter<number>();

  readonly browserScrollRef = new ElementRef(this.elementRef.nativeElement);

  get countOfRows(): number {
    return Math.floor((this.max.year - this.min.year) / YEARS_PER_ROW);
  }

  get rows(): number[] {
    return Array.from({ length: this.countOfRows }, (_, i) => i + 1);
  }

  get columns(): number[] {
    return Array.from({ length: YEARS_PER_ROW }, (_, i) => i + 1);
  }

  constructor(@Inject(ElementRef) private readonly elementRef: ElementRef) {}

  @HostListener(`${SUP_SCROLL_INTO_VIEW}`, ['$event.target'])
  scrollIntoView(detail: HTMLElement): void {
    const { nativeElement } = this.browserScrollRef;

    const { offsetTop, offsetLeft } = supGetElementOffset(
      nativeElement,
      detail
    );

    const { clientHeight, clientWidth } = nativeElement;
    const { offsetHeight, offsetWidth } = detail;
    const scrollTop = offsetTop + offsetHeight / 2 - clientHeight / 2;
    const scrollLeft = offsetLeft + offsetWidth / 2 - clientWidth / 2;

    nativeElement.scrollTo?.({
      top: scrollTop,
      left: scrollLeft,
      behavior: 'smooth',
    });
  }

  select(year: number, event: Event): void {
    event.stopPropagation();
    this.yearSelect.emit(year);
  }

  trackByFn(index: number, year: number): number {
    return year;
  }
}
