import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Optional,
} from '@angular/core';
import { SUB_TAB_ACTIVATE_EVENT, SUP_TAB_ACTIVATION } from './tabs.helpers';
import { EMPTY, filter, fromEvent, identity, map, merge, Observable } from 'rxjs';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { RouterLinkActive } from '@angular/router';
import {
  MutationObserverService,
  SupDestroyService,
  SupRouterLinkActiveService,
} from '@supply/cdk';

@Component({
  selector: 'a[supTab]:not([routerLink]), a[supTab][routerLink][routerLinkActive], button[supTab]',
  templateUrl: './tab.html',
  styleUrls: ['./tab.scss'],
  inputs: ['icon', 'iconRight'],
  providers: [
    SupDestroyService,
    SupRouterLinkActiveService,
    {
      provide: SUP_TAB_ACTIVATION,
      deps: [
        ElementRef,
        SupRouterLinkActiveService,
        [new Optional(), MutationObserverService],
        [new Optional(), RouterLinkActive],
      ],
      useFactory: (
        { nativeElement }: ElementRef<HTMLElement>,
        routerLinkActiveService: Observable<boolean>,
        mutationObserverService: MutationObserverService | null,
        routerLinkActive: RouterLinkActive | null,
      ): Observable<unknown> => {
        const mutationObserver =
          routerLinkActive && mutationObserverService
            ? mutationObserverService.pipe(filter(() => routerLinkActive.isActive))
            : EMPTY;

        return merge(
          mutationObserver,
          routerLinkActiveService.pipe(filter(identity)),
          nativeElement.matches('button') ? fromEvent(nativeElement, 'click') : EMPTY,
        ).pipe(
          map(() =>
            nativeElement.dispatchEvent(new CustomEvent(SUB_TAB_ACTIVATE_EVENT, { bubbles: true })),
          ),
        );
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupTabComponent {
  icon: ReflectiveContent;

  iconRight: ReflectiveContent;

  @HostBinding('class.sup-active')
  get isActive(): boolean {
    return !!this.routerLinkActive && this.routerLinkActive.isActive;
  }

  constructor(
    @Inject(SUP_TAB_ACTIVATION) readonly activate$: Observable<CustomEvent>,
    @Optional()
    @Inject(RouterLinkActive)
    private readonly routerLinkActive: RouterLinkActive | null,
  ) {}
}
