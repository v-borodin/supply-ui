export type SupConstructor<T = object> = new (...args: any[]) => T;

export type SupAbstractConstructor<T = object> = abstract new (
  ...args: any[]
) => T;
