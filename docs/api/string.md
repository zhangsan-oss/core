# 字符串 string

## capitalize

首字母大写，其余不变。

```ts
capitalize(value: string): string
```

```ts
capitalize('hello')  // 'Hello'
capitalize('')       // ''
```

## kebabCase

驼峰转中划线。

```ts
kebabCase(value: string): string
```

```ts
kebabCase('getUserById') // 'get-user-by-id'
kebabCase('getUserID')   // 'get-user-id'
```

## camelCase

中划线或下划线转驼峰。

```ts
camelCase(value: string): string
```

```ts
camelCase('get-user-by-id') // 'getUserById'
camelCase('get_user_by_id') // 'getUserById'
```

## truncate

超过 `maxLength` 时截断并追加省略号。

```ts
truncate(value: string, maxLength: number, ellipsis?: string): string
```

```ts
truncate('hello world', 8)         // 'hello...'
truncate('hello', 8)               // 'hello'
truncate('hello world', 8, '…')    // 'hello wo…'
```

## trim

去掉首尾空白，兼容非字符串入参。

```ts
trim(value: unknown): string
```

```ts
trim('  a b  ')      // 'a b'
trim(123)            // ''
```

## countOccurrences

统计字符串出现次数。

```ts
countOccurrences(value: string, search: string): number
```

```ts
countOccurrences('abcabc', 'a')  // 2
countOccurrences('abc', '')      // 0
```

## format

模板字符串替换。

```ts
format(template: string, params: Record<string, string | number>): string
```

```ts
format('hello {name}', { name: 'tom' }) // 'hello tom'
format('{a}-{b}', { a: 1, b: 2 })       // '1-2'
```
