/**
 * 函数工具：防抖、节流、记忆化等
 * 仅依赖全局 setTimeout / clearTimeout，web 与小程序环境均可用
 */

/** 防抖：连续触发时只在最后一次触发后等待 delay 毫秒再执行 */
export function debounce<T extends (...args: never[]) => void>(fn: T, delay = 300): T {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (this: unknown, ...args: never[]) {
    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  } as T
}

/** 节流：固定时间间隔内最多执行一次 */
export function throttle<T extends (...args: never[]) => void>(fn: T, interval = 300): T {
  let lastTime = 0
  return function (this: unknown, ...args: never[]) {
    const now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  } as T
}

/** 只执行一次，后续调用直接返回第一次的结果 */
export function once<T extends (...args: never[]) => unknown>(fn: T): T {
  let called = false
  let result: unknown
  return function (this: unknown, ...args: never[]) {
    if (!called) {
      called = true
      result = fn.apply(this, args)
    }
    return result
  } as T
}

/** 记忆化：相同参数直接返回缓存结果，适合纯函数 */
export function memoize<T extends (...args: never[]) => unknown>(fn: T): T {
  const cache = new Map<string, unknown>()
  return function (this: unknown, ...args: never[]) {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  } as T
}
