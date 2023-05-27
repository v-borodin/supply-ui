import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxContentOutlet } from '@coreteq/ngx-projection';
import { SupDropdownComponent } from './dropdown.component';
import { SupDropdownDirective } from './dropdown.directive';
import { SupIconComponent } from '../icon';
import { SupTooltipModule } from '../tooltip';

@NgModule({
  declarations: [SupDropdownDirective, SupDropdownComponent],
  imports: [CommonModule, SupIconComponent, NgxContentOutlet, SupTooltipModule],
  exports: [SupDropdownDirective],
})
export class SupDropdownModule {}
