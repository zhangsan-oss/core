/**
 * 对象工具
 */

/** 只保留指定字段，返回新对象 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key]
    }
  }
  return result
}

/** 剔除指定字段，返回新对象 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj } as Omit<T, K>
  for (const key of keys) {
    delete (result as Record<string, unknown>)[key as string]
  }
  return result
}

/** 深拷贝，处理 Date、RegExp、Map、Set 及循环引用 */
export function deepClone<T>(value: T, seen = new Map<unknown, unknown>()): T {
  if (value === null || typeof value !== 'object') return value

  if (seen.has(value)) return seen.get(value) as T

  let result: unknown
  if (value instanceof Date) {
    result = new Date(value.getTime())
  } else if (value instanceof RegExp) {
    result = new RegExp(value.source, value.flags)
  } else if (value instanceof Map) {
    result = new Map()
    seen.set(value, result)
    for (const [k, v] of value) {
      ;(result as Map<unknown, unknown>).set(deepClone(k, seen), deepClone(v, seen))
    }
  } else if (value instanceof Set) {
    result = new Set()
    seen.set(value, result)
    for (const item of value) {
      ;(result as Set<unknown>).add(deepClone(item, seen))
    }
  } else if (Array.isArray(value)) {
    result = []
    seen.set(value, result)
    for (const item of value) {
      ;(result as unknown[]).push(deepClone(item, seen))
    }
  } else {
    result = {}
    seen.set(value, result)
    for (const key of Object.keys(value)) {
      ;(result as Record<string, unknown>)[key] = deepClone(
        (value as Record<string, unknown>)[key],
        seen
      )
    }
  }
  return result as T
}

/** 深合并，后者覆盖前者，数组与基本类型直接替换 */
export function deepMerge<T extends Record<string, unknown>>(...sources: T[]): T {
  const result = {} as Record<string, unknown>
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const value = source[key]
      const current = result[key]
      if (isPlainObjectLike(value) && isPlainObjectLike(current)) {
        result[key] = deepMerge(current, value)
      } else {
        result[key] = value
      }
    }
  }
  return result as T
}

function isPlainObjectLike(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/** 对象是否包含指定字段 */
export function hasKey<T extends Record<string, unknown>>(obj: T, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/** 两个对象浅比较，值相等返回 true */
export function shallowEqual(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key) || a[key] !== b[key]) return false
  }
  return true
}
