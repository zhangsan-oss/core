# 函数 function

仅依赖全局 setTimeout / clearTimeout，web 与小程序环境均可用。

## debounce

防抖：连续触发时只在最后一次触发后等待 `delay` 毫秒再执行。

```ts
debounce<T extends (...args: never[]) => void>(fn: T, delay?: number): T
```

```ts
const onSearch = debounce((keyword: string) => {
  console.log('搜索:', keyword)
}, 300)

// 快速连续调用，300ms 内只执行最后一次
input.addEventListener('input', (e) => onSearch(e.target.value))
```

## throttle

节流：固定时间间隔内最多执行一次。

```ts
throttle<T extends (...args: never[]) => void>(fn: T, interval?: number): T
```

```ts
const onScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY)
}, 200)

window.addEventListener('scroll', onScroll)
```

## once

只执行一次，后续调用直接返回第一次的结果。

```ts
once<T extends (...args: never[]) => unknown>(fn: T): T
```

```ts
const init = once(() => {
  console.log('只执行一次')
  return 'result'
})

init()   // 输出并返回 'result'
init()   // 直接返回 'result'
```

## memoize

记忆化：相同参数直接返回缓存结果，适合纯函数。

```ts
memoize<T extends (...args: never[]) => unknown>(fn: T): T
```

```ts
const factorial = memoize((n: number): number => {
  return n <= 1 ? 1 : n * factorial(n - 1)
})

factorial(10)  // 首次计算 3628800
factorial(10)  // 直接命中缓存返回
```
