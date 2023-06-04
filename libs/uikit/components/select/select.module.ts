import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { SupSelectComponent } from './select.component';
import { SupSelectDirective } from './select.directive';
import { SupInputModule } from '../input';
import { SupDropdownModule } from '../dropdown';

@NgModule({
  declarations: [SupSelectComponent, SupSelectDirective],
  imports: [SupInputModule, SupDropdownModule, NgIf],
  exports: [SupSelectComponent, SupSelectDirective],
})
export class SupSelectModule {}
