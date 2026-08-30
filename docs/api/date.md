# 日期 date

全部基于 Date 实现，不依赖第三方库。

## formatDate

格式化日期，支持 `YYYY`、`MM`、`DD`、`HH`、`mm`、`ss` 占位符。

```ts
formatDate(date: Date, template?: string): string
```

```ts
formatDate(new Date(2024, 0, 2, 3, 4, 5))
// '2024-01-02 03:04:05'

formatDate(new Date(2024, 0, 2), 'YYYY年MM月DD日')
// '2024年01月02日'
```

## isLeapYear

判断是否为闰年。

```ts
isLeapYear(year: number): boolean
```

```ts
isLeapYear(2024)         // true
isLeapYear(2023)         // false
isLeapYear(2000)         // true
```

## getDaysInMonth

获取某年某月的天数，`month` 从 1 开始。

```ts
getDaysInMonth(year: number, month: number): number
```

```ts
getDaysInMonth(2024, 2)  // 29
getDaysInMonth(2023, 2)  // 28
getDaysInMonth(2024, 4)  // 30
```

## addDays

日期加减天数，返回新 Date，不修改原对象。

```ts
addDays(date: Date, days: number): Date
```

```ts
const date = new Date(2024, 0, 1)
addDays(date, 1)         // 2024-01-02
addDays(date, -1)        // 2023-12-31
// date 本身不变
```

## diffDays

计算两个日期相差的天数，按整天向下取整。

```ts
diffDays(start: Date, end: Date): number
```

```ts
diffDays(new Date(2024, 0, 1), new Date(2024, 0, 3))  // 2
```

## timeAgo

相对时间描述，如刚刚、5 分钟前、3 天前。

```ts
timeAgo(date: Date, now?: Date): string
```

```ts
timeAgo(new Date(Date.now() - 5 * 60 * 1000))  // '5 分钟前'
timeAgo(new Date(Date.now() - 3 * 86400000))   // '3 天前'
```

## getMonthRange

获取某月的第一天和最后一天，返回数组。

```ts
getMonthRange(year: number, month: number): [Date, Date]
```

```ts
getMonthRange(2024, 2)
// [2024-02-01, 2024-02-29]
```
