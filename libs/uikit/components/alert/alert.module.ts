import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { NgxContentOutlet } from '@coreteq/ngx-projection';
import { SupAlertComponent } from './alert.component';
import { SupNotificationComponent } from '../notification';
import { SupAlertHostComponent } from './alert-host/alert-host.component';
import { SUP_ALERT_CONFIGURATION, SupAlertConfiguration } from './alert.helpers';
import { SupAlertService } from './alert.service';

const supDefaultAlertConfiguration: SupAlertConfiguration = {
  component: SupAlertComponent,

  hostPosition: {
    top: 24,
    right: 36,
  },
};

@NgModule({
  declarations: [SupAlertComponent, SupAlertHostComponent],
  imports: [SupNotificationComponent, NgxContentOutlet, AsyncPipe, NgForOf],
})
export class SupAlertModule {
  static forRoot(config = supDefaultAlertConfiguration): ModuleWithProviders<SupAlertModule> {
    return {
      ngModule: SupAlertModule,
      providers: [
        SupAlertService,
        {
          provide: SUP_ALERT_CONFIGURATION,
          useValue: { ...supDefaultAlertConfiguration, ...config },
        },
      ],
    };
  }
}
