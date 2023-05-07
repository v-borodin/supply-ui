import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ReflectiveContent } from '@coreteq/ngx-projection';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @ViewChild(TemplateRef, { static: true })
  readonly implicit: TemplateRef<any> | null = null;

  @ContentChild('lazyContent', { static: true })
  readonly explicit: TemplateRef<any> | null = null;

  get template(): TemplateRef<any> | null {
    return this.explicit ?? this.implicit;
  }

  @Input()
  name = '';

  @Input()
  icon: ReflectiveContent;
}
