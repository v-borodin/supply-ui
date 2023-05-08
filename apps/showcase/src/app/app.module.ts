import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxContentOutlet } from '@coreteq/ngx-projection';
import { SupSvgRegistry } from '@supply/cdk';
import { appCoreIcons } from '@app/icons';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { IntroductionPageComponent } from './feature/introduction-page/introduction-page.component';
import { SharedModule } from './common/shared.module';

@NgModule({
  declarations: [AppComponent, IntroductionPageComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, NgxContentOutlet, SharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(@Inject(SupSvgRegistry) svg: SupSvgRegistry) {
    svg.register(appCoreIcons);
  }
}
