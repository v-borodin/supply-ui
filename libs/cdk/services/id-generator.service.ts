import { inject, Injectable } from '@angular/core';
import { SupPrefixed } from '@supply/cdk/types';

/** Base class for generate unique ID strategy */
@Injectable({
  providedIn: 'root',
  useFactory: () => inject(DefaultIdGeneratorStrategy),
})
export abstract class SupIdGeneratorStrategy<T extends string> {
  abstract generate(): T;
}

/** Default generator strategy */
@Injectable({
  providedIn: 'root',
})
class DefaultIdGeneratorStrategy extends SupIdGeneratorStrategy<SupPrefixed> {
  private static uniqueNextId = 0;

  constructor() {
    super();
  }

  generate(): SupPrefixed {
    return `sup-${Date.now() + DefaultIdGeneratorStrategy.uniqueNextId++}`;
  }
}
