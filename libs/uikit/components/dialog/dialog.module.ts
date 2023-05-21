import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxContentOutlet } from '@coreteq/ngx-projection';
import { SupTooltipModule } from '@supply/uikit/components/tooltip';
import { SupIconComponent } from '@supply/uikit/components/icon';
import { SupDialogComponent } from './dialog.component';

@NgModule({
  declarations: [SupDialogComponent],
  imports: [CommonModule, NgxContentOutlet, SupTooltipModule, SupIconComponent],
})
export class SupDialogModule {}
