import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  delay,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import {
  AsyncPipe,
  NgIf,
  NgIfContext,
  NgTemplateOutlet,
} from '@angular/common';

const enum State {
  Default = 'default',

  Process = 'process',

  Animated = 'animated',
}

@Component({
  selector: 'sup-expander',
  templateUrl: './expander.component.html',
  styleUrls: ['./expander.component.scss'],
  standalone: true,
  imports: [NgIf, AsyncPipe, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpanderComponent implements OnChanges {
  @ViewChild('wrapper')
  private readonly wrapper?: ElementRef<HTMLDivElement>;

  @ContentChild('expandedContent', { read: TemplateRef })
  public content: TemplateRef<NgIfContext> | null = null;

  @Input()
  @HostBinding('class._expanded')
  @HostBinding('attr.aria-expanded')
  expanded: boolean | null = null;

  @HostBinding('class._overflow')
  get overflow(): boolean {
    return this.state !== State.Default;
  }

  get displayContent(): boolean {
    return this.expanded || this.state !== State.Default;
  }

  private state = State.Default;

  private readonly expand$ = new Subject<boolean | null>();

  readonly stateController$: Observable<any>;

  constructor(
    @Inject(ChangeDetectorRef) private cd: ChangeDetectorRef,
    @Inject(ElementRef) { nativeElement }: ElementRef
  ) {
    const onTransitionEnd$ = fromEvent<TransitionEvent>(
      nativeElement,
      'transitionend'
    );

    this.stateController$ = this.expand$.pipe(
      filter(value => value != null),
      distinctUntilChanged(),
      tap(() => this.updateState(State.Process)),
      delay(50),
      switchMap(() => {
        this.updateState(State.Animated);
        return onTransitionEnd$.pipe(
          map(event => event.propertyName),
          filter(property => property === 'opacity'),
          tap(() => this.updateState(State.Default, false)),
          take(1)
        );
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const { expanded } = changes;
    if (expanded) {
      this.expand$.next(expanded.currentValue);
    }
  }

  @HostBinding('style.height.px')
  get height(): number | null {
    const { expanded, state, wrapper } = this;

    if (wrapper) {
      const { nativeElement } = wrapper;

      if (
        (!expanded && state === State.Animated) ||
        (expanded && state === State.Process)
      ) {
        return 0;
      }

      if (
        (!expanded && state === State.Process) ||
        (expanded && state === State.Animated)
      ) {
        return nativeElement.offsetHeight;
      }
    }

    return null;
  }

  private updateState(state: State, markForCheck = true): void {
    this.state = state;
    markForCheck && this.cd.markForCheck();
  }
}
