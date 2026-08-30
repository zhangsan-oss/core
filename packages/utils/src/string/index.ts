/**
 * 字符串处理工具
 */

/** 首字母大写，其余不变 */
export function capitalize(value: string): string {
  if (value.length === 0) return value
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/** 驼峰转中划线，如 getUserById -> get-user-by-id */
export function kebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/** 中划线或下划线转驼峰，如 get-user-by-id -> getUserById */
export function camelCase(value: string): string {
  const normalized = value.replace(/[-_\s]+(.)?/g, (_, char: string) =>
    char ? char.toUpperCase() : ''
  )
  return normalized.charAt(0).toLowerCase() + normalized.slice(1)
}

/** 超过 maxLength 时截断并追加省略号 */
export function truncate(value: string, maxLength: number, ellipsis = '...'): string {
  if (value.length <= maxLength) return value
  return value.slice(0, maxLength - ellipsis.length) + ellipsis
}

/** 去掉首尾空白，兼容非字符串入参 */
export function trim(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

/** 统计字符串出现次数 */
export function countOccurrences(value: string, search: string): number {
  if (search.length === 0) return 0
  let count = 0
  let index = 0
  while ((index = value.indexOf(search, index)) !== -1) {
    count += 1
    index += search.length
  }
  return count
}

/** 模板字符串替换，如 format('hello {name}', { name: 'tom' }) -> hello tom */
export function format(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    return Object.prototype.hasOwnProperty.call(params, key) ? String(params[key]) : match
  })
}
