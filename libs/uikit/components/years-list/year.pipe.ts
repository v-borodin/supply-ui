import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';
import { YEARS_PER_ROW } from './years-list.component';

@Pipe({
  name: 'supYear',
  standalone: true,
})
export class YearPipe implements PipeTransform {
  transform(
    value: DateTime,
    [rowIndex, columnIndex]: [row: number, column: number]
  ) {
    return rowIndex * YEARS_PER_ROW + columnIndex + value.year;
  }
}
