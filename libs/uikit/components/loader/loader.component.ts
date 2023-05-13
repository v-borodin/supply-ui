import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input } from '@angular/core';
import { supMixinAppearance, supMixinLoadable, supMixinSize } from '@supply/cdk';
import { SUP_LOADER_OPTIONS, SupLoaderOptions } from './loader.helpers';
import { NgIf } from '@angular/common';

const LoaderMixin = supMixinAppearance(
  supMixinSize(
    supMixinLoadable(
      class {
        constructor(readonly elementRef: ElementRef) {}
      },
      true
    )
  )
);

@Component({
  selector: 'sup-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss'],
  inputs: ['loading'],
  host: {
    role: 'status',
  },
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupLoaderComponent extends LoaderMixin {
  @Input()
  override size = this.options.size;

  @Input()
  override appearance = this.options.appearance;

  @Input()
  hasOverlay = this.options.hasOverlay;

  constructor(
    @Inject(SUP_LOADER_OPTIONS) private readonly options: SupLoaderOptions,
    @Inject(ElementRef) elementRef: ElementRef
  ) {
    super(elementRef);
  }
}
