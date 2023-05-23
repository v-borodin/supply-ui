import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupIconComponent } from '@supply/uikit/components/icon';
import { SupTableComponent } from './table.component';
import { SupCellComponent, SupTitleComponent } from '../table';

@NgModule({
  declarations: [SupTableComponent, SupTitleComponent, SupCellComponent],
  imports: [CommonModule, SupIconComponent],
  exports: [SupTitleComponent, SupTableComponent, SupCellComponent],
})
export class SupTableModule {}
