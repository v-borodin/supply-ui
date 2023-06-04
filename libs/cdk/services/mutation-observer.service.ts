import { ElementRef, Inject, Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export function booleanAttribute(element: Element, attribute: string): true | undefined {
  return element.getAttribute(attribute) !== null || undefined;
}

export function mutationObserverInitFactory({
  nativeElement,
}: ElementRef<Element>): MutationObserverInit {
  const attributeFilter = nativeElement.getAttribute('attributeFilter');

  return {
    attributeFilter: attributeFilter?.split(',').map(attr => attr.trim()),
    attributeOldValue: booleanAttribute(nativeElement, 'attributeOldValue'),
    attributes: booleanAttribute(nativeElement, 'attributes'),
    characterData: booleanAttribute(nativeElement, 'characterData'),
    characterDataOldValue: booleanAttribute(nativeElement, 'characterDataOldValue'),
    childList: booleanAttribute(nativeElement, 'childList'),
    subtree: booleanAttribute(nativeElement, 'subtree'),
  };
}

export const MUTATION_OBSERVER_INIT = new InjectionToken<MutationObserverInit>(
  'MutationObserver config',
);

@Injectable()
export class MutationObserverService extends Observable<readonly MutationRecord[]> {
  constructor(
    @Inject(ElementRef) { nativeElement }: ElementRef<Node>,
    @Inject(MUTATION_OBSERVER_INIT) config: MutationObserverInit,
  ) {
    super(subscriber => {
      const observer = new MutationObserver(records => {
        subscriber.next(records);
      });

      observer.observe(nativeElement, config);

      return () => {
        observer.disconnect();
      };
    });
  }
}
