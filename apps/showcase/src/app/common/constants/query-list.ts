import { QueryList } from '@angular/core';

export const EMPTY_QUERY = new QueryList<any>();

export function getOriginalArray<T>(queryList: QueryList<T>): readonly T[] {
  let array: readonly T[] = [];

  queryList.find((_item, _index, originalArray) => {
    array = originalArray;

    return true;
  });

  return array;
}
