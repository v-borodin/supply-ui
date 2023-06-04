import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
} from '@angular/core';
import { SupDomHandler } from '@supply/cdk';
import { SUB_TAB_ACTIVATE_EVENT } from './tabs.helpers';

@Component({
  selector: 'sup-tabs, nav[supTabs]',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.scss'],
  inputs: ['activeTabIndex'],
  outputs: ['activeTabIndexChange'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupTabsComponent implements AfterViewChecked {
  activeTabIndex = 0;

  readonly activeTabIndexChange = new EventEmitter<number>();

  get tabs(): readonly HTMLElement[] {
    return Array.from(this.elementRef.nativeElement.querySelectorAll<HTMLElement>('[supTab]'));
  }

  get activeElement(): HTMLElement | null {
    return this.tabs[this.activeTabIndex] || null;
  }

  constructor(@Inject(ElementRef) private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewChecked(): void {
    const { tabs, activeElement } = this;

    tabs.forEach(nativeElement => {
      const active = nativeElement === activeElement;

      SupDomHandler.toggleClass(nativeElement, 'sup-active', active);
      SupDomHandler.setAttribute(nativeElement, 'tabIndex', active ? '0' : '-1');
    });
  }

  @HostListener(SUB_TAB_ACTIVATE_EVENT, ['$event', '$event.target'])
  private onActivate(event: CustomEvent, element: HTMLElement) {
    const index = this.tabs.findIndex(tab => tab === element);

    event.stopPropagation();

    if (index === this.activeTabIndex) {
      return;
    }

    this.activeTabIndexChange.emit(index);
    this.activeTabIndex = index;
  }
}
