import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'sup-masker-renderer',
  templateUrl: './masker-renderer.component.html',
  styleUrls: ['./masker-renderer.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaskerRendererComponent {
  @Output()
  touched = new EventEmitter<void>();

  hidden = true;

  touch(): void {
    this.hidden = !this.hidden;
    this.touched.emit();
  }
}
