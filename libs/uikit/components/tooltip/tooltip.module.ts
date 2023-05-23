import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxContentOutlet } from '@coreteq/ngx-projection';
import { SupTooltipDirective } from './tooltip.directive';
import { SupTooltipComponent } from './tooltip.component';
import { SupTooltipHoverDirective } from './tooltip-hover.directive';

@NgModule({
  declarations: [SupTooltipDirective, SupTooltipComponent, SupTooltipHoverDirective],
  imports: [CommonModule, NgxContentOutlet],
  exports: [SupTooltipDirective, SupTooltipHoverDirective],
})
export class SupTooltipModule {}
