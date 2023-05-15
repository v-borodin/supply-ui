import { Inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { supIsObject } from '@supply/cdk/utils';

@Injectable({
  providedIn: 'root',
})
export class SupSvgRegistry implements OnDestroy {
  private readonly registry = new Map<string, string>();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer
  ) {}

  ngOnDestroy() {
    this.registry.clear();
  }

  register(source: Record<string, string>): void;
  register(name: string, source: string): void;
  register(nameOrSource: string | Record<string, string>, source?: string): void {
    if (supIsObject(nameOrSource)) {
      Object.keys(nameOrSource).forEach(key =>
        this.registerSvgSource(key, nameOrSource[key])
      );
    } else if (source) {
      this.registerSvgSource(nameOrSource, source);
    }
  }

  retrieve(name: string): string | null {
    return this.registry.get(name) ?? null;
  }

  private registerSvgSource(key: string, source: string): void {
    if (this.registry.has(key)) {
      console.warn(`Icon with key [${key}] is already registered`);
      return;
    }

    this.registry.set(key, source);
  }

  // @TODO: resolve
  // private getSvgFromStringLiteral(literal: string): SVGElement {
  //   const div = this.document.createElement('div');
  //
  //   div.innerHTML = String(this.sanitize(literal));
  //
  //   return div.querySelector('svg') as SVGElement;
  // }

  // private sanitize(source: string): SafeHtml {
  //   return this.sanitizer.bypassSecurityTrustHtml(DOMPurify.sanitize(source));
  // }
}
