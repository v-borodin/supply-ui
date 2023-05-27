import { NgModule } from '@angular/core';
import { NgComponentOutlet, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgxContentOutlet } from '@coreteq/ngx-projection';
import { SupIconComponent } from '@supply/uikit';
import { DemoComponent } from './components/demo/demo.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';

const toExport = [DemoComponent, HighlightComponent];

@NgModule({
  declarations: [TabsComponent, TabComponent, ...toExport],
  imports: [NgForOf, NgComponentOutlet, NgIf, NgxContentOutlet, SupIconComponent, NgTemplateOutlet],
  exports: [...toExport],
})
export class SharedModule {}
