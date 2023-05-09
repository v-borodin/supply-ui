import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SupButtonComponent, SupIconComponent } from '@supply/uikit';
import { ButtonPageComponent } from './button-page.component';
import { DefaultButtonDemoComponent } from './default-button/default-button-demo.component';
import { ButtonStatesDemoComponent } from './button-states/button-states-demo.component';
import { LayoutModule } from '../../layout/layout.module';
import { ButtonSizeShapeDemoComponent } from './button-size-shape/button-size-shape-demo.component';
import { SharedModule } from '../../common/shared.module';
import { ButtonStatesExampleComponent } from './button-states/button-states-example.component';
import { ButtonSizeShapeExampleComponent } from './button-size-shape/button-size-shape-example.component';
import { ButtonCustomizationExampleComponent } from './button-customization/button-customization-example.component';
import { ButtonCustomizationDemoComponent } from './button-customization/button-customization-demo.component';
import {DefaultButtonExampleComponent} from "./default-button/default-button-example.component";

@NgModule({
  declarations: [
    ButtonPageComponent,
    DefaultButtonDemoComponent,
    ButtonStatesDemoComponent,
    ButtonSizeShapeDemoComponent,
    ButtonCustomizationDemoComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ButtonPageComponent,
      },
    ]),
    SupIconComponent,
    LayoutModule,
    SharedModule,
    SupButtonComponent,
    DefaultButtonExampleComponent,
    ButtonStatesExampleComponent,
    ButtonStatesExampleComponent,
    ButtonSizeShapeExampleComponent,
    ButtonCustomizationExampleComponent,
  ],
})
export class ButtonPageModule {}
