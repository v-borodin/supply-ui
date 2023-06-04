import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnDestroy,
} from '@angular/core';
import { AnimationOptions } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import {
  SUP_ANIMATION_OPTIONS,
  SUP_FADEIN_ANIMATION,
  SUP_HEIGHT_COLLAPSE_ANIMATION,
  SUP_SLIDE_IN_RIGHT_ANIMATION,
  supFadeIn,
  supHeightCollapse,
  supSlideInRight,
  SUP_DATA_CONTEXT,
} from '@supply/cdk';
import { SUP_ALERT_LIST, SupAlert, SupAlertContext } from './alert.helpers';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'sup-alert',
  templateUrl: './alert.html',
  styleUrls: ['./alert.scss'],
  host: {
    role: 'alert',
  },
  animations: [supFadeIn, supSlideInRight, supHeightCollapse],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupAlertComponent implements OnDestroy {
  @HostBinding(`@${SUP_FADEIN_ANIMATION}`)
  @HostBinding(`@${SUP_SLIDE_IN_RIGHT_ANIMATION}`)
  @HostBinding(`@${SUP_HEIGHT_COLLAPSE_ANIMATION}`)
  readonly animation = { value: '', ...this.animationOptions } as const;

  private readonly intervalId: number;

  constructor(
    @Inject(SUP_DATA_CONTEXT) readonly context: SupAlertContext,
    @Inject(SUP_ALERT_LIST) private readonly alerts$: BehaviorSubject<SupAlert[]>,
    @Inject(SUP_ANIMATION_OPTIONS) private readonly animationOptions: AnimationOptions,
    @Inject(DOCUMENT) document: Document
  ) {
    if (!document.defaultView) {
      throw new Error('SupAlertComponent requires Window');
    }

    this.intervalId = document.defaultView.setTimeout(
      () => this.close(),
      context.autoClose
    );
  }

  ngOnDestroy(): void {
    clearTimeout(this.intervalId);
  }

  close(): void {
    this.alerts$.next([
      ...this.alerts$.getValue().filter(alert => alert.id !== this.context.id),
    ]);
  }
}
