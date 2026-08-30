# 数组 array

所有函数均返回新数组，不修改原数组，保持纯函数特性。

## chunk

按指定大小分块。

```ts
chunk<T>(arr: T[], size: number): T[][]
```

```ts
chunk([1, 2, 3, 4, 5], 2)  // [[1, 2], [3, 4], [5]]
chunk([1, 2], 0)           // []
```

## unique

数组去重，使用 SameValueZero 比较。

```ts
unique<T>(arr: T[]): T[]
```

```ts
unique([1, 2, 2, 3])       // [1, 2, 3]
```

## uniqueBy

数组去重，按指定字段或回调结果。

```ts
uniqueBy<T>(arr: T[], key: (item: T) => string | number): T[]
```

```ts
uniqueBy(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  (item) => item.id
)  // [{ id: 1 }, { id: 2 }]
```

## groupBy

按 key 分组。

```ts
groupBy<T extends Record<string, unknown>>(arr: T[], key: keyof T): Record<string, T[]>
```

```ts
groupBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
// { a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] }
```

## flatten

数组扁平化，`depth` 控制展开层数，默认展开全部。

```ts
flatten<T>(arr: T[], depth?: number): T[]
```

```ts
flatten([1, [2, [3]]])         // [1, 2, 3]
flatten([1, [2, [3]]], 1)      // [1, 2, [3]]
```

## first

取出第一个元素，空数组返回 `undefined`。

```ts
first<T>(arr: T[]): T | undefined
```

```ts
first([1, 2, 3])       // 1
first([])              // undefined
```

## last

取出最后一个元素，空数组返回 `undefined`。

```ts
last<T>(arr: T[]): T | undefined
```

```ts
last([1, 2, 3])        // 3
last([])               // undefined
```

## intersection

两个数组交集，返回去重后的结果。

```ts
intersection<T>(a: T[], b: T[]): T[]
```

```ts
intersection([1, 2, 2], [2, 3])  // [2]
```

## difference

两个数组差集：在 a 中但不在 b 中。

```ts
difference<T>(a: T[], b: T[]): T[]
```

```ts
difference([1, 2, 3], [2])       // [1, 3]
```

## sum

数组求和，空数组返回 0。

```ts
sum(arr: number[]): number
```

```ts
sum([1, 2, 3])         // 6
sum([])                // 0
```
