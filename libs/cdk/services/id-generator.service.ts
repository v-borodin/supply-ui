import { inject, Injectable } from '@angular/core';

/** Base class for generate unique ID strategy */
@Injectable({
  providedIn: 'root',
  useFactory: () => inject(DefaultIdGeneratorStrategy),
})
export abstract class SupIdGeneratorStrategy<T> {
  abstract generate(): T;
}

/** Default generator strategy */
@Injectable({
  providedIn: 'root',
})
class DefaultIdGeneratorStrategy extends SupIdGeneratorStrategy<string> {
  private readonly prefix = 'sup-';

  private static uniqueNextId = 0;

  constructor() {
    super();
  }

  generate(): string {
    return `${this.prefix}${
      Date.now() + DefaultIdGeneratorStrategy.uniqueNextId++
    }`;
  }
}
