import { inject, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/** Base class for generate unique ID strategy */
@Injectable({
  providedIn: 'root',
  useFactory: () => inject(DefaultIdGeneratorStrategy),
})
export abstract class SupIdGeneratorStrategy<T> {
  abstract generate(): T;
}

let uniqueNextId = 0;

/** Default generator strategy */
@Injectable({
  providedIn: 'root',
})
class DefaultIdGeneratorStrategy extends SupIdGeneratorStrategy<string> {
  private readonly prefix = 'sup-';

  get window(): Window {
    const { defaultView } = this.document;

    if (!defaultView) {
      throw new Error('Error getting window');
    }

    return defaultView;
  }

  get isSecureContext(): boolean {
    return this.window.isSecureContext;
  }

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    super();
  }

  generate(): string {
    let uniqueId;

    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
     */
    if (this.isSecureContext) {
      uniqueId = this.window.crypto.randomUUID();
    } else {
      uniqueId = Date.now() + uniqueNextId++;
    }

    return `${this.prefix}${uniqueId}`;
  }
}
