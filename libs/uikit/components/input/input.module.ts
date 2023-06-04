import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxContentOutlet } from '@coreteq/ngx-projection';
import { SupInputComponent } from './input.component';
import { SupInputDirective } from './input.directive';
import { SupIconComponent } from '../icon';
import { SupLoaderComponent } from '../loader';

@NgModule({
  declarations: [SupInputComponent, SupInputDirective],
  imports: [CommonModule, NgxContentOutlet, SupIconComponent, SupLoaderComponent],
  exports: [SupInputComponent, SupInputDirective],
})
export class SupInputModule {}
