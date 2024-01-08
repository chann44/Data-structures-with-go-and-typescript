interface IntArrayFun {
  (capacity?: number): {
    size: () => number;
    isEmpty: () => boolean;
    get: (index: number) => number;
    set: (index: number, elem: number) => void;
    add: (elem: number) => void;
    removeAt: (rmIndex: number) => void;
    remove: (elem: number) => boolean;
    reverse: () => void;
    binarySearch: (key: number) => number;
    sort: () => void;
    [Symbol.iterator]: () => Iterator<number>;
    toString: () => string;
  };
}

const createIntArray: IntArrayFun = (initialCapacity = 8) => {
  let len = 0;
  let capacity = initialCapacity;
  let arr: number[] = new Array<number>(initialCapacity);

  const size = (): number => len;

  const isEmpty = (): boolean => len === 0;

  const get = (index: number): number => arr[index];

  const set = (index: number, elem: number): void => {
    arr[index] = elem;
  };

  const add = (elem: number): void => {
    if (len + 1 >= capacity) {
      if (capacity === 0) capacity = 1;
      else capacity *= 2;
      arr = arr.concat(new Array<number>(capacity - len));
    }
    arr[len++] = elem;
  };

  const removeAt = (rmIndex: number): void => {
    arr.copyWithin(rmIndex, rmIndex + 1, len - rmIndex);
    len--;
    capacity--;
  };

  const remove = (elem: number): boolean => {
    const index = arr.indexOf(elem);
    if (index !== -1) {
      removeAt(index);
      return true;
    }
    return false;
  };

  const reverse = (): void => {
    for (let i = 0; i < len / 2; i++) {
      const tmp = arr[i];
      arr[i] = arr[len - i - 1];
      arr[len - i - 1] = tmp;
    }
  };

  const binarySearch = (key: number): number => {
    return arr.indexOf(key);
  };

  const sort = (): void => {
    arr = arr.slice(0, len).sort((a, b) => a - b);
  };

  const iterator = (): Iterator<number> => {
    let index = 0;
    return {
      next: (): IteratorResult<number> => {
        if (index < len) {
          return { value: arr[index++], done: false };
        } else {
          return { value: undefined as any, done: true };
        }
      },
    };
  };

  const toString = (): string => {
    if (len === 0) return "[]";
    else {
      return `[${arr.slice(0, len).join(", ")}]`;
    }
  };

  return {
    size,
    isEmpty,
    get,
    set,
    add,
    removeAt,
    remove,
    reverse,
    binarySearch,
    sort,
    [Symbol.iterator]: iterator,
    toString,
  };
};

// Example usage
const ar = createIntArray(50);
ar.add(3);
ar.add(7);
ar.add(6);
ar.add(-2);

ar.sort(); // [-2, 3, 6, 7]

// Prints [-2, 3, 6, 7]
for (let i = 0; i < ar.size(); i++) console.log(ar.get(i));

// Prints [-2, 3, 6, 7]
console.log(ar.toString());
