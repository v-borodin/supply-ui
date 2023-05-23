import { Type } from '@angular/core';

export abstract class AbstractShowcase<T = any> {
  abstract readonly example: {
    readonly Preview: Type<T>;
    readonly HTML: string | { default: string };
    readonly SCSS: string | { default: string };
    readonly TypeScript: string | { default: string };
  };
}
