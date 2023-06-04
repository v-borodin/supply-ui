import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SupAlertService } from '@supply/uikit';

@Component({
  selector: 'app-select-basic-example',
  templateUrl: './select-basic-example.component.html',
  styleUrls: ['./select-basic-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBasicExampleComponent {
  options = [
    'University of Matej Bel',
    'Slovak University of Technology in Bratislava',
    'Comenius University in Bratislava',
    'University of Economics in Bratislava',
    'Academy of Performing Arts in Bratislava',
    'University of Ss. Cyril and Methodius',
    'Technical University in Zvolen',
    'University of Constantinus the Philosopher',
    'Academy of Fine Arts and Design in Bratislava',
  ];

  alert = inject(SupAlertService);

  notify(message: string): void {
    this.alert.push(`<b>You have chosen: </b> ${message}`, {
      status: 'info',
    });
  }
}
