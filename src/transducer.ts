import { from, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

/**
 * Returns a function that takes any number of rxjs operators to lazily transform the input
 * collection. Runs synchronously.
 * Note that the result will always we collected in an array. Even if the result is only one value (reduce)
 */
export function transducer<T>(collection: T[] | IterableIterator<T>): IPipe<T> {
  return function pipe(...operators: Array<OperatorFunction<any, any>>) {
    let result: Array<T> = [];
    const source = from(collection);
    const collect = scan<T>(
      (acc, res) => {
        acc.push(res);
        return acc;
      },
      <Array<T>>[]
    );
    source.pipe.apply(source, [...operators, collect]).subscribe(res => (result = res));
    return result;
  };
}

export type UnaryFunction<T, R> = (source: T) => R;
export interface OperatorFunction<T, R> extends UnaryFunction<Observable<T>, Observable<R>> {}

export interface IPipe<T> {
  (): T[];
  <A>(op1: OperatorFunction<T, A>): A[];
  <A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): B[];
  <A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): C[];
  <A, B, C, D>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>
  ): D[];
  <A, B, C, D, E>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>
  ): E[];
  <A, B, C, D, E, F>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>
  ): F[];
  <A, B, C, D, E, F, G>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>
  ): G[];
  <A, B, C, D, E, F, G, H>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    op8: OperatorFunction<G, H>
  ): H[];
  <A, B, C, D, E, F, G, H, I>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    op8: OperatorFunction<G, H>,
    op9: OperatorFunction<H, I>
  ): I[];
  <A, B, C, D, E, F, G, H, I>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    op8: OperatorFunction<G, H>,
    op9: OperatorFunction<H, I>,
    ...operations: OperatorFunction<any, any>[]
  ): {}[];
}
