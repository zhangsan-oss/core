/**
 * 类型判断工具
 * 全部为纯函数，不依赖任何运行时环境，适用于 web / App / 小程序
 */

/** 是否为字符串 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/** 是否为数字，排除 NaN */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

/** 是否为布尔值 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/** 是否为函数 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function'
}

/** 是否为数组 */
export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value)
}

/** 是否为对象，排除 null 和数组 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/** 是否为普通对象，排除 Date、RegExp、Map 等内置类型 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!isObject(value)) return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/** 是否为 undefined */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

/** 是否为 null */
export function isNull(value: unknown): value is null {
  return value === null
}

/** 是否为 null 或 undefined */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

/** 是否为空值：null、undefined、空字符串、空数组、空对象 */
export function isEmpty(value: unknown): boolean  {
  if (isNil(value)) return true
  if (typeof value === 'string') return value.length === 0
  if (Array.isArray(value)) return value.length === 0
  if (isPlainObject(value)) return Object.keys(value).length === 0
  return false
}

/** 是否为 16 位手机号 */
export function isPhone(value: string): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}

/** 是否为合法邮箱 */
export function isEmail(value: string): boolean {
  return /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
}

/** 是否为合法 URL */
export function isUrl(value: string): boolean {
  try {
    // URL 构造函数在部分小程序环境不存在，退化为正则校验
    if (typeof URL === 'function') {
      new URL(value)
      return true
    }
  } catch {
    return false
  }
  return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value)
}
