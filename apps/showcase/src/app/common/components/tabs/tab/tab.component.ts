import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { ReflectiveContent } from '@coreteq/ngx-projection';
import { supMemo } from '@supply/cdk/decorators';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  inputs: ['name', 'icon'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @ViewChild(TemplateRef, { static: true })
  readonly implicit: TemplateRef<any> | null = null;

  @ContentChild('lazyContent', { static: true })
  readonly explicit: TemplateRef<any> | null = null;

  @supMemo
  get template(): TemplateRef<any> | null {
    return this.explicit ?? this.implicit;
  }

  name = '';

  icon: ReflectiveContent;
}
