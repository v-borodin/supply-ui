import { inject, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import * as DOMPurify from 'dompurify';

@Pipe({
  name: 'dompurify',
  standalone: true,
})
export class SupDompurifyPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(
    value: Node | string | null,
    context: SecurityContext = SecurityContext.HTML
  ): SafeValue | null {
    if (!value) {
      return value;
    }

    return this.bypassSecurityTrust(context, DOMPurify.sanitize(value));
  }

  private bypassSecurityTrust(
    context: SecurityContext,
    value: string
  ): SafeValue {
    switch (context) {
      case SecurityContext.HTML:
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case SecurityContext.STYLE:
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case SecurityContext.SCRIPT:
        return this.sanitizer.bypassSecurityTrustScript(value);
      case SecurityContext.URL:
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case SecurityContext.RESOURCE_URL:
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid security context value ${context}`);
    }
  }
}
