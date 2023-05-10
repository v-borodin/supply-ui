import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { APP_TITLE } from './tokens/app-title';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  private readonly appTitle = inject(APP_TITLE);

  constructor(readonly title: Title) {
    super();
  }

  updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      this.title.setTitle(`${this.appTitle}: ${title}`);
    }
  }
}
