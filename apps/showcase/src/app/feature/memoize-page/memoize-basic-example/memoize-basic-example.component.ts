import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-memoize',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoizeBasicExampleComponent {}

export function supMemo(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalGetter = descriptor.get;

  descriptor.get = function () {
    if (!this.hasOwnProperty(key)) {
      Object.defineProperty(this, key, {
        value: originalGetter?.apply(this),
        configurable: true,
        writable: true,
      });
    }

    return (this as any)[key];
  };
}
