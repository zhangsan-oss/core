# 类型判断 type

全部为纯函数，不依赖任何运行时环境，适用于 web / App / 小程序。类型判断函数均返回类型谓词，通过后 TypeScript 自动收窄类型。

## isString

判断是否为字符串。

```ts
isString(value: unknown): value is string
```

```ts
isString('a')        // true
isString(1)          // false
```

## isNumber

判断是否为数字，排除 `NaN`。

```ts
isNumber(value: unknown): value is number
```

```ts
isNumber(1)          // true
isNumber(NaN)        // false
isNumber('1')        // false
```

## isBoolean

判断是否为布尔值。

```ts
isBoolean(value: unknown): value is boolean
```

```ts
isBoolean(true)      // true
isBoolean(0)         // false
```

## isFunction

判断是否为函数。

```ts
isFunction(value: unknown): value is (...args: unknown[]) => unknown
```

```ts
isFunction(() => {}) // true
isFunction({})       // false
```

## isArray

判断是否为数组。

```ts
isArray<T = unknown>(value: unknown): value is T[]
```

```ts
isArray([1, 2])      // true
isArray('a')         // false
```

## isObject

判断是否为对象，排除 `null` 和数组。

```ts
isObject(value: unknown): value is Record<string, unknown>
```

```ts
isObject({})         // true
isObject([])         // false
isObject(null)       // false
```

## isPlainObject

判断是否为普通对象，排除 Date、RegExp、Map 等内置类型。

```ts
isPlainObject(value: unknown): value is Record<string, unknown>
```

```ts
isPlainObject({})    // true
isPlainObject(new Date()) // false
```

## isUndefined

判断是否为 `undefined`。

```ts
isUndefined(value: unknown): value is undefined
```

## isNull

判断是否为 `null`。

```ts
isNull(value: unknown): value is null
```

## isNil

判断是否为 `null` 或 `undefined`。

```ts
isNil(value: unknown): value is null | undefined
```

```ts
isNil(null)          // true
isNil(undefined)     // true
isNil(0)             // false
```

## isEmpty

判断是否为空值：`null`、`undefined`、空字符串、空数组、空对象。

```ts
isEmpty(value: unknown): boolean
```

```ts
isEmpty('')          // true
isEmpty([])          // true
isEmpty({})          // true
isEmpty(0)           // false
```

## isPhone

判断是否为 11 位大陆手机号。

可直接使用 `PHONE_REGEXP` 作为表单校验规则。

```ts
const PHONE_REGEXP = /^1[3-9]\d{9}$/
```

```ts
isPhone(value: string): boolean
PHONE_REGEXP: RegExp
```

```ts
isPhone('13800138000') // true
isPhone('12345')       // false
PHONE_REGEXP.test('13912345678') // true
```

## isEmail

判断是否为合法邮箱。

```ts
isEmail(value: string): boolean
```

```ts
isEmail('a@b.com')   // true
isEmail('a@b')       // false
```

## isUrl

判断是否为合法 URL。

```ts
isUrl(value: string): boolean
```

```ts
isUrl('https://example.com') // true
isUrl('not-a-url')           // false
```
