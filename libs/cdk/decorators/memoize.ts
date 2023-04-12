export function supMemo(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  if (descriptor.get) {
    const { enumerable, get } = descriptor;
    return {
      get: function () {
        const value = get.call(this);

        Object.defineProperty(this, propertyKey, { enumerable, value });

        return value;
      },
      configurable: true,
      enumerable: enumerable,
    };
  }
}
