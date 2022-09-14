# rxjs-transducer

A transducer implementation using the excellent and well known operators from RxJS.
The benefits are:

- Performance: Doing a array.map().filter().reduce() causes the array to be iterated 3 times. Using rxjs-transducers, the array is only iterated once. Doing a `filter().map().Math.max()` on an array with 1,000,000 items is roughly three times as fast with the transducer as with normal array operations.
- Ability to work with lazy and infinite collections (generators)
- Access to a huge library of well tested operators from RxJS such as `map`, `filter`, `reduce`, `skip`, `take`, `takeWhile`, and many others
- Full TypeScript support

## Installation

```sh
npm install rxjs-transducer --save
```

## Usage

### TypeScript / ES6

```typescript
import { transducer } from 'rxjs-transducer';
import { map, filter, reduce, skip, take } from 'rxjs/operators';
const source = ['a', 'ab', 'abc', 'abcd', 'abcde'];

// Works as standard array map and filter, but faster (only one iteration)
const result = transducer(source)(
  map(word => word.toUpperCase()),
  filter(word => word.length > 2)
);
// result -> ['ABC', 'ABCD', 'ABCDE']

// Note that results is always an array, even if the final operator
// only produces a single result
const result = transducer(source)(
  map(word => word.toUpperCase()),
  filter(word => word.length > 2),
  reduce((acc, s) => `${acc}-${s}`)
);
// result -> ['ABC-ABCD-ABCDE']

// Works with infinte sequences too
const result = transducer(integers())(
  map(i => i * 2),
  filter(i => i % 10 === 0),
  skip(10),
  take(5)
);
// result -> [100, 110, 120, 130, 140]

// Infinite sequence of integers from zero -> infinite
function* integers() {
  let i = 0;
  while (true) {
    yield i++;
  }
}
```

### Javascript

```javascript
const { map, filter, reduce, take, skip } = require('rxjs/operators');
const { transducer } = require('rxjs-transducer');
const source = ['a', 'ab', 'abc', 'abcd', 'abcde'];

const result = transducer(source)(
  map(word => word.toUpperCase()),
  filter(word => word.length > 2)
);
// result -> ['ABC', 'ABCD', 'ABCDE']
```

## Test

```sh
npm run test
```
