import { Type } from '@angular/core';

export abstract class AbstractShowcase {
  abstract readonly example: {
    readonly Preview: Type<any>;
    readonly HTML: string | { default: string };
    readonly SCSS: string | { default: string };
    readonly TypeScript: string | { default: string };
  };
}
