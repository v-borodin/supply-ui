import { map, Observable } from 'rxjs';

export function trueEmitter<T>(): (source: Observable<T>) => Observable<boolean> {
  return function (source: Observable<T>): Observable<boolean> {
    return source.pipe(map(() => true));
  };
}

export function falseEmitter<T>(): (source: Observable<T>) => Observable<boolean> {
  return function (source: Observable<T>): Observable<boolean> {
    return source.pipe(map(() => false));
  };
}
