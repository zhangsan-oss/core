/**
 * 数组工具
 * 注意：所有函数均返回新数组，不修改原数组，保持纯函数特性
 */

/** 按指定大小分块，如 chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],[5]] */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0 || arr.length === 0) return []
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/** 数组去重，使用 SameValueZero 比较 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

/** 按 key 分组，如 groupBy([{type:'a'},{type:'b'},{type:'a'}], 'type') */
export function groupBy<T extends Record<string, unknown>>(
  arr: T[],
  key: keyof T
): Record<string, T[]> {
  const result: Record<string, T[]> = {}
  for (const item of arr) {
    const groupKey = String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
  }
  return result
}

/** 数组扁平化，depth 控制展开层数 */
export function flatten<T>(arr: T[], depth = Infinity): T[] {
  return arr.flat(depth) as T[]
}

/** 取出第一个元素，空数组返回 undefined */
export function first<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined
}

/** 取出最后一个元素，空数组返回 undefined */
export function last<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[arr.length - 1] : undefined
}

/** 数组去重，按指定字段 */
export function uniqueBy<T>(arr: T[], key: (item: T) => string | number): T[] {
  const seen = new Set<string | number>()
  const result: T[] = []
  for (const item of arr) {
    const k = key(item)
    if (!seen.has(k)) {
      seen.add(k)
      result.push(item)
    }
  }
  return result
}

/** 两个数组交集 */
export function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b)
  return Array.from(new Set(a.filter((item) => setB.has(item))))
}

/** 两个数组差集：在 a 中但不在 b 中 */
export function difference<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b)
  return Array.from(new Set(a.filter((item) => !setB.has(item))))
}

/** 数组求和，空数组返回 0 */
export function sum(arr: number[]): number {
  return arr.reduce((total, num) => total + num, 0)
}
