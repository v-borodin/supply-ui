import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'td[supCell]',
  templateUrl: './cell.html',
  styleUrls: ['./cell.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupCellComponent {
  @Input()
  alignment = 'left';
}
