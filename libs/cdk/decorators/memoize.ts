export function supMemo(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalGetter = descriptor.get;

  descriptor.get = function () {
    // eslint-disable-next-line no-prototype-builtins
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
