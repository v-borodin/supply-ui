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
export class DropdownTemplateExampleComponent {
  readonly imgSrc =
    'https://eu-images.contentstack.com/v3/assets/blt95b381df7c12c15d/blt36251e0ba0a6e7ae/643d26a11c0a4f0561e1bd84/Rovio_Header.png?quality=80&format=jpg&width=828';
}
