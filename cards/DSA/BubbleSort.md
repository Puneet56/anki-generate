# Write bubble sort

```typescript
export default function bubble_sort(arr: number[]): void {
  // compare current and next
  // if current > next (swap)
  // each iteration will put one item, at correct position largest first
  // Time complexity O(N^2)
  // In place sorting alogithm

  // iterating for whole length
  for (let i = 0; i < arr.length; i++) {
    // not need to check last as it is already sorted
    for (let j = 0; j < arr.length - 1 - i; j++) {
      // current > next
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
}
```
