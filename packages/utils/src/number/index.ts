/**
 * 数字处理工具
 */

/** 将数字限制在 [min, max] 区间内 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** 判断数字是否在区间内，默认左闭右开 */
export function inRange(value: number, min: number, max: number, inclusive = false): boolean {
  return inclusive ? value >= min && value <= max : value >= min && value < max
}

/** 生成 [min, max] 闭区间内的随机整数 */
export function randomInt(min: number, max: number): number {
  if (min > max) {
    ;[min, max] = [max, min]
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** 千分位格式化，如 1234567.89 -> 1,234,567.89 */
export function toThousands(value: number): string {
  const [intPart, decimalPart] = String(value).split('.')
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decimalPart === undefined ? formatted : `${formatted}.${decimalPart}`
}

/** 安全求和，自动忽略非数字 */
export function safeSum(...values: number[]): number {
  return values.reduce((total, value) => {
    return total + (Number.isFinite(value) ? value : 0)
  }, 0)
}

/** 保留指定小数位，返回数字，防止浮点精度溢出 */
export function round(value: number, precision = 0): number {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

/** 百分比转换，如 0.1234 -> 12.34% */
export function toPercent(value: number, precision = 2): string {
  return `${round(value * 100, precision)}%`
}
