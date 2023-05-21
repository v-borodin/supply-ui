import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Inject,
} from '@angular/core';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import {
  SUP_DATA_CONTEXT,
  SupDialog,
  SupDialogOptions,
  supMixinShape,
  supMixinSize,
} from '@supply/cdk';
import { SUP_CLOSE_WORD } from '@supply/uikit';
import { SupDialogRef } from '@supply/cdk/classes';

const DialogMixin = supMixinSize(
  supMixinShape(
    class {
      constructor(readonly elementRef: ElementRef) {}
    }
  )
);

@Component({
  selector: 'sup-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.scss'],
  host: {
    tabindex: '-1',
    '[attr.id]': 'context.id',
    '[attr.role]': 'context.role',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupDialogComponent extends DialogMixin {
  @HostBinding('class.has-header')
  get header(): ReflectiveContent {
    return this.context.header;
  }

  @HostBinding('class.has-footer')
  get footer(): ReflectiveContent {
    return this.context.footer;
  }

  override size = this.context.size;

  constructor(
    @Inject(SUP_DATA_CONTEXT)
    readonly context: Partial<SupDialog<SupDialogOptions>>,
    @Inject(SupDialogRef) readonly dialog: SupDialogRef,
    @Inject(SUP_CLOSE_WORD) readonly closeWord: string,
    @Inject(ElementRef) elementRef: ElementRef
  ) {
    super(elementRef);
  }
}
