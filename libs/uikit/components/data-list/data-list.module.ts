import { NgModule } from '@angular/core';
import { SupDataListComponent } from './data-list.component';
import { SupOptionComponent } from './option.component';
import { SupDataListDirective } from './data-list.directive';

@NgModule({
  declarations: [SupDataListComponent, SupDataListDirective, SupOptionComponent],
  exports: [SupDataListComponent, SupDataListDirective, SupOptionComponent],
})
export class SupDataListModule {}
