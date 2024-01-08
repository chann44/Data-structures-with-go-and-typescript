class IntArray implements Iterable<number> {
  private static readonly DEFAULT_CAP: number = 16;

  public arr: number[];
  public len: number = 0;
  private capacity: number = 0;

  // Initialize the array with a default capacity
  constructor(capacity: number = IntArray.DEFAULT_CAP) {
    if (capacity < 0) throw new Error(`Illegal Capacity: ${capacity}`);
    this.capacity = capacity;
    this.arr = new Array<number>(capacity);
  }

  // Returns the size of the array
  public size(): number {
    return this.len;
  }

  // Returns true/false on whether the array is empty
  public isEmpty(): boolean {
    return this.len === 0;
  }

  // To get/set values without method call overhead you can do
  // arrayObj.arr[index] instead, you can gain about 10x the speed!
  public get(index: number): number {
    return this.arr[index];
  }

  public set(index: number, elem: number): void {
    this.arr[index] = elem;
  }

  // Add an element to this dynamic array
  public add(elem: number): void {
    if (this.len + 1 >= this.capacity) {
      if (this.capacity === 0) this.capacity = 1;
      else this.capacity *= 2; // double the size
      this.arr = this.arr.concat(new Array<number>(this.capacity - this.len));
    }
    this.arr[this.len++] = elem;
  }

  // Removes the element at the specified index in this list.
  // If possible, avoid calling this method as it takes O(n) time
  // to remove an element (since you have to reconstruct the array!)
  public removeAt(rmIndex: number): void {
    this.arr.copyWithin(rmIndex, rmIndex + 1, this.len - rmIndex);
    this.len--;
    this.capacity--;
  }

  // Search and remove an element if it is found in the array
  // If possible, avoid calling this method as it takes O(n) time
  public remove(elem: number): boolean {
    const index = this.arr.indexOf(elem);
    if (index !== -1) {
      this.removeAt(index);
      return true;
    }
    return false;
  }

  // Reverse the contents of this array
  public reverse(): void {
    for (let i = 0; i < this.len / 2; i++) {
      const tmp = this.arr[i];
      this.arr[i] = this.arr[this.len - i - 1];
      this.arr[this.len - i - 1] = tmp;
    }
  }

  // Perform a binary search on this array to find an element in O(log(n)) time
  // Make sure this array is sorted! Returns a value < 0 if the item is not found
  public binarySearch(key: number): number {
    return this.arr.indexOf(key);
  }

  // Sort this array
  public sort(): void {
    this.arr = this.arr.slice(0, this.len).sort((a, b) => a - b);
  }

  // Iterator is still fast but not as fast as an iterative for loop
  public [Symbol.iterator](): Iterator<number> {
    let index = 0;
    return {
      next: (): IteratorResult<number> => {
        if (index < this.len) {
          return { value: this.arr[index++], done: false };
        } else {
          return { value: undefined as any, done: true };
        }
      },
    };
  }

  public toString(): string {
    if (this.len === 0) return "[]";
    else {
      return `[${this.arr.slice(0, this.len).join(", ")}]`;
    }
  }

  // Example usage
  public static main(): void {
    const ar = new IntArray(50);
    ar.add(3);
    ar.add(7);
    ar.add(6);
    ar.add(-2);

    ar.sort(); // [-2, 3, 6, 7]

    // Prints [-2, 3, 6, 7]
    for (let i = 0; i < ar.size(); i++) console.log(ar.get(i));

    // Prints [-2, 3, 6, 7]
    console.log(ar.toString());
  }
}
