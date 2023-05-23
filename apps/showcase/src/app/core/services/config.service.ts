import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: Readonly<Record<string, any>> = {};

  constructor(
    @Inject(HttpClient) private readonly http: HttpClient,
    @Inject(APP_BASE_HREF) private readonly baseHref: string
  ) {}

  async load(): Promise<void> {
    try {
      const config$ = lastValueFrom(this.http.get<Record<any, any>>(`${this.baseHref}assets/config/dev.json`));
      this.config = await config$;
    } catch (err) {
      console.error(err);
    }
  }

  get<T = unknown>(key: string): T {
    return this.config[key];
  }
}
