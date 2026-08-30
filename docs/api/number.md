# 数字 number

## randomInt

生成 [min, max] 闭区间内的随机整数，参数顺序不要求。

```ts
randomInt(min: number, max: number): number
```

```ts
randomInt(1, 10)   // 1 到 10 之间的随机整数
randomInt(10, 1)   // 同上，自动交换参数
```

## toThousands

千分位格式化。

```ts
toThousands(value: number): string
```

```ts
toThousands(1234567.89)  // '1,234,567.89'
toThousands(1000)        // '1,000'
```

## safeSum

安全求和，自动忽略非数字。

```ts
safeSum(...values: number[]): number
```

```ts
safeSum(1, 2, 3)         // 6
safeSum(1, NaN, 2)       // 3
```

## round

保留指定小数位，返回数字，防止浮点精度溢出。

```ts
round(value: number, precision?: number): number
```

```ts
round(0.1 + 0.2, 1)      // 0.3
round(3.14159, 2)        // 3.14
```

## toPercent

百分比转换。

```ts
toPercent(value: number, precision?: number): string
```

```ts
toPercent(0.1234)        // '12.34%'
toPercent(1)             // '100%'
```
