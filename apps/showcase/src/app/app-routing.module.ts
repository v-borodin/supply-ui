import { NgModule } from '@angular/core';
import { RouterModule, TitleStrategy } from '@angular/router';
import { appRoutes } from './app.routes';
import { TemplatePageTitleStrategy } from './core/services/template-title';

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
  ],
})
export class AppRoutingModule {}
