import { Inject, Injectable, OnDestroy, SecurityContext } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { supIsObject } from '@supply/cdk/utils';

@Injectable({
  providedIn: 'root',
})
export class SupSvgRegistry implements OnDestroy {
  private readonly registry = new Map<string, SVGElement>();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer
  ) {}

  ngOnDestroy() {
    this.registry.clear();
  }

  register(source: Record<string, string>): void;
  register(name: string, source: string): void;
  register(
    nameOrSource: string | Record<string, string>,
    source?: string
  ): void {
    if (supIsObject(nameOrSource)) {
      Object.keys(nameOrSource).forEach(key =>
        this.registerSvgElement(key, nameOrSource[key])
      );
    } else if (source) {
      this.registerSvgElement(nameOrSource, source);
    }
  }

  retrieve(name: string): SVGElement | null {
    return this.registry.get(name) ?? null;
  }

  private registerSvgElement(key: string, source: string): void {
    if (this.registry.has(key)) {
      console.warn(`Icon with key ${key} is already registered`);
      return;
    }

    this.registry.set(key, this.getSvgFromStringLiteral(source));
  }

  private getSvgFromStringLiteral(literal: string): SVGElement {
    const div = this.document.createElement('DIV');

    div.innerHTML = String(this.sanitize(literal));

    return div.querySelector('svg') as SVGElement;
  }

  private sanitize(source: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      this.sanitizer.sanitize(SecurityContext.HTML, source) || ''
    );
  }
}
