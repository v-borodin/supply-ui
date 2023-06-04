import { NgModule } from '@angular/core';
import { SupTextareaComponent } from './textarea.component';
import { SupTextareaDirective } from './textarea.directive';

@NgModule({
  declarations: [SupTextareaComponent, SupTextareaDirective],
  exports: [SupTextareaComponent, SupTextareaDirective],
})
export class SupTextareaModule {}
