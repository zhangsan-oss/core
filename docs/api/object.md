# 对象 object

## pick

只保留指定字段，返回新对象。

```ts
pick<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
```

```ts
pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])  // { a: 1, c: 3 }
```

## omit

剔除指定字段，返回新对象。

```ts
omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
```

```ts
omit({ a: 1, b: 2, c: 3 }, ['b'])       // { a: 1, c: 3 }
```

## deepClone

深拷贝，处理 Date、RegExp、Map、Set 及循环引用。

```ts
deepClone<T>(value: T): T
```

```ts
const obj = { a: { b: 1 }, date: new Date() }
const copy = deepClone(obj)

copy === obj                 // false
copy.a === obj.a             // false
copy.date === obj.date       // false
```

## deepMerge

深合并，后者覆盖前者，数组与基本类型直接替换。

```ts
deepMerge<T extends Record<string, unknown>>(...sources: T[]): T
```

```ts
deepMerge({ a: { x: 1 }, b: 2 }, { a: { y: 3 } })
// { a: { x: 1, y: 3 }, b: 2 }
```

## hasKey

对象是否包含指定字段。

```ts
hasKey<T extends Record<string, unknown>>(obj: T, key: string): boolean
```

```ts
hasKey({ a: 1 }, 'a')        // true
hasKey({ a: 1 }, 'b')        // false
```

## shallowEqual

两个对象浅比较，值相等返回 `true`。

```ts
shallowEqual(a: Record<string, unknown>, b: Record<string, unknown>): boolean
```

```ts
shallowEqual({ a: 1 }, { a: 1 })  // true
shallowEqual({ a: 1 }, { a: 2 })  // false
```
