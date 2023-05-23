import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-textarea-page',
  templateUrl: './textarea-page.component.html',
  styleUrls: ['./textarea-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaPageComponent {}
