import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxContentOutlet } from '@coreteq/ngx-projection';
import { SupSvgRegistry } from '@supply/cdk';
import { appCoreIcons } from '@app/icons';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { IntroductionPageComponent } from './feature/introduction-page/introduction-page.component';
import { SharedModule } from './common/shared.module';
import { ConfigService } from './core/services/config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, IntroductionPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    NgxContentOutlet,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      deps: [PlatformLocation],
      useFactory: (location: PlatformLocation) => location.getBaseHrefFromDOM(),
    },
    {
      provide: APP_INITIALIZER,
      deps: [ConfigService],
      useFactory: (config: ConfigService) => {
        return () => config.load();
      },
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(@Inject(SupSvgRegistry) svg: SupSvgRegistry) {
    svg.register(appCoreIcons);
  }
}
