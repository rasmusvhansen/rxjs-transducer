import 'jasmine';
import { transducer } from './transducer';
import { map, filter, reduce, skip, take } from 'rxjs/operators';
const source = ['a', 'ab', 'abc', 'abcd', 'abcde'];

describe('Transducer', () => {
  it('should be able to filter and map', () => {
    const result = transducer(source)(map(word => word.toUpperCase()), filter(word => word.length > 2));
    expect(result.length).toBe(3);
    expect(result).toEqual(['ABC', 'ABCD', 'ABCDE']);
  });

  it('should be able to filter and map and reduce', () => {
    const result = transducer(source)(
      map(word => word.toUpperCase()),
      filter(word => word.length > 2),
      reduce((acc, s) => `${acc}-${s}`)
    );
    expect(result.length).toBe(1);
    expect(result).toEqual(['ABC-ABCD-ABCDE']);
  });

  it('should be able to skip and take', () => {
    const result = transducer(source)(skip(1), take(2));
    expect(result.length).toBe(2);
    expect(result).toEqual(['ab', 'abc']);
  });

  it('should work with infinite sequences', () => {
    const result = transducer(integers())(map(i => i * 2), filter(i => i % 10 === 0), skip(10), take(5));
    expect(result.length).toBe(5);
    expect(result).toEqual([100, 110, 120, 130, 140]);
  });
});

function* integers() {
  let i = 0;
  while (true) {
    yield i++;
  }
}
