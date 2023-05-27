import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupButtonComponent } from '@supply/uikit';
import { SupDropdownModule } from '@supply/uikit/components/dropdown';

@Component({
  standalone: true,
  selector: 'app-dropdown-template-example',
  templateUrl: './dropdown-template-example.component.html',
  styleUrls: ['./dropdown-template-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SupButtonComponent, SupDropdownModule],
})
export class DropdownTemplateExampleComponent {}
