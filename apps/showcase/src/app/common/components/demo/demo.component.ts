import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type TemplateTab = 'Preview' | 'TypeScript' | 'HTML' | 'SCSS';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  @Input()
  example: Readonly<Record<string, any>> = {};

  @Input()
  activeTab = 0;

  readonly lang = {
    Preview: '',
    HTML: 'html',
    SCSS: 'scss',
    TypeScript: 'ts',
  };

  readonly tabs: ReadonlyArray<TemplateTab> = ['Preview', 'TypeScript', 'HTML', 'SCSS'];
}
