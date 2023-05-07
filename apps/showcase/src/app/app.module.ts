import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { SupSvgRegistry } from '@supply/cdk';
import { appCoreIcons } from '@app/icons';
import { IntroductionPageComponent } from './feature/introduction-page/introduction-page.component';
import { ButtonPageComponent } from './feature/button-page/button-page.component';
import { SupButtonComponent, SupIconComponent } from '@supply/uikit';
import { DefaultButtonDemoComponent } from './feature/button-page/default-button/default-button-demo.component';
import { TabsComponent } from './common/components/tabs/tabs.component';
import { TabComponent } from './common/components/tabs/tab/tab.component';
import { HighlightComponent } from './common/components/highlight/highlight.component';
import { DemoComponent } from './common/components/demo/demo.component';
import { NgxContentOutlet } from '@coreteq/ngx-projection';
import { DefaultButtonExampleComponent } from './feature/button-page/default-button/default-button-example.component';
import { ButtonStatesExampleComponent } from './feature/button-page/button-states/button-states-example.component';
import { ButtonStatesDemoComponent } from './feature/button-page/button-states/button-states-demo.component';
import { ButtonSizeShapeExampleComponent } from './feature/button-page/button-size-shape/button-size-shape-example.component';
import { ButtonSizeShapeDemoComponent } from './feature/button-page/button-size-shape/button-size-shape-demo.component';
import { NotificationPageComponent } from './feature/notification-page/notification-page.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroductionPageComponent,
    ButtonPageComponent,
    DefaultButtonDemoComponent,
    DefaultButtonExampleComponent,
    TabsComponent,
    TabComponent,
    HighlightComponent,
    DemoComponent,
    ButtonStatesExampleComponent,
    ButtonStatesDemoComponent,
    ButtonSizeShapeExampleComponent,
    ButtonSizeShapeDemoComponent,
    NotificationPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    SupIconComponent,
    SupButtonComponent,
    NgxContentOutlet,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(@Inject(SupSvgRegistry) svg: SupSvgRegistry) {
    svg.register(appCoreIcons);
  }
}
