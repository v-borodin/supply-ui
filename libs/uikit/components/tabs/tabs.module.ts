import { NgModule } from '@angular/core';
import { SupTabsComponent } from './tabs.component';
import { SupTabComponent } from './tab.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgxContentOutlet } from '@coreteq/ngx-projection';
import { SupIconComponent } from '../icon';

@NgModule({
  declarations: [SupTabsComponent, SupTabComponent],
  exports: [SupTabsComponent, SupTabComponent],
  imports: [NgIf, AsyncPipe, NgxContentOutlet, SupIconComponent],
})
export class SupTabsModule {}
