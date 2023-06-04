import {
  inject,
  Inject,
  Injectable,
  Injector,
  INJECTOR,
  OnDestroy,
  StaticProvider,
  Type,
} from '@angular/core';
import { Overlay, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { SUP_DATA_CONTEXT, SupIdGeneratorStrategy, supToPx } from '@supply/cdk';
import {
  SUP_ALERT_HOST_CONTAINER,
  SUP_ALERT_OPTIONS,
  SupAlert,
  SupAlertOptions,
  SUP_ALERT_LIST,
  SupAlertContext,
  SUP_ALERT_CONFIGURATION,
  SupAlertConfiguration,
} from './alert.helpers';

@Injectable({
  providedIn: 'root',
})
export class SupAlertService implements OnDestroy {
  private readonly alerts$ = new BehaviorSubject<SupAlert[]>([]);

  private readonly id = inject(SupIdGeneratorStrategy);

  constructor(
    @Inject(SUP_ALERT_HOST_CONTAINER) private readonly hostContainer: Type<unknown>,
    @Inject(SUP_ALERT_CONFIGURATION) private readonly config: SupAlertConfiguration,
    @Inject(SUP_ALERT_OPTIONS) private readonly defaultOptions: SupAlertOptions,
    @Inject(INJECTOR) private readonly injector: Injector,
    @Inject(Overlay) private readonly overlay: Overlay
  ) {
    this.attachHost();
  }

  ngOnDestroy(): void {
    this.alerts$.next([]);
    this.alerts$.complete();
  }

  push(content: ReflectiveContent, options?: Partial<SupAlertOptions>): void {
    const id = this.id.generate();
    const { component } = this.config;
    const providers = this.getComponentProviders({
      content,
      id,
      ...this.defaultOptions,
      ...options,
    });

    const alert: SupAlert = {
      id,
      component,
      injector: Injector.create({
        parent: this.injector,
        providers,
      }),
    };

    this.alerts$.next([...this.alerts$.getValue(), alert]);
  }

  private attachHost(): void {
    const positionStrategy = this.getHostPosition();
    const providers = this.getHostProviders();

    const overlayRef = this.overlay.create({
      positionStrategy,
    });

    const containerPortal = new ComponentPortal(
      this.hostContainer,
      null,
      Injector.create({
        parent: this.injector,
        providers,
      })
    );

    overlayRef.attach(containerPortal);
  }

  private getHostPosition(): PositionStrategy {
    const {
      hostPosition: { top, left, right, bottom },
    } = this.config;

    const position = this.overlay.position().global();

    if (top) position.top(supToPx(top));
    if (right) position.right(supToPx(right));
    if (left) position.left(supToPx(left));
    if (bottom) position.bottom(supToPx(bottom));

    return position;
  }

  private getHostProviders(): StaticProvider[] {
    return [
      {
        provide: SUP_ALERT_LIST,
        useValue: this.alerts$.asObservable(),
      },
    ];
  }

  private getComponentProviders(context: Partial<SupAlertContext>): StaticProvider[] {
    return [
      {
        provide: SUP_DATA_CONTEXT,
        useValue: {
          ...context,
        },
      },
      {
        provide: SUP_ALERT_LIST,
        useValue: this.alerts$,
      },
    ];
  }
}
