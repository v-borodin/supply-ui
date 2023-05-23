import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dropdown-component-example',
  imports: [CommonModule],
  templateUrl: './dropdown-component-example.component.html',
  styleUrls: ['./dropdown-component-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponentExampleComponent {}
